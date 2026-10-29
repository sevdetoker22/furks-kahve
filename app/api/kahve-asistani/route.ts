import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { MAX_BODY_BYTES, parseMessages, resolveReply } from "@/lib/coffee-assistant/contracts";
import { generateCoffeeReply } from "@/lib/coffee-assistant/generate";
import { createBurstLimiter } from "@/lib/coffee-assistant/rate-limit";
import { providerErrorCode } from "@/lib/coffee-assistant/provider-error";
import type { Product } from "@/lib/supabase/products";

export const runtime = "nodejs";
export const maxDuration = 30;
const limit = createBurstLimiter();
const privateHeaders = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };

function failure(message: string, status: number, headers: Record<string, string> = {}) {
  return Response.json({ error: message }, { status, headers: { ...privateHeaders, ...headers } });
}

async function readBody(request: Request) {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return null;
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return failure("Lütfen asistanı Furks Kahve sitesi üzerinden kullanın.", 403);
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return failure("Mesaj gönderilemedi. Sayfayı yenileyip tekrar deneyin.", 415);
  }
  // Vercel overwrites x-forwarded-for. No raw IP or conversation is logged/stored.
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const retryAfter = limit(createHash("sha256").update(address).digest("hex"));
  if (retryAfter) return failure("Biraz hızlı ilerledik. Bir dakika sonra tekrar deneyebilirsin.", 429, { "Retry-After": String(retryAfter) });
  const messages = parseMessages(await readBody(request));
  if (!messages) return failure("Mesajını 600 karakteri geçmeyecek şekilde yeniden yazabilir misin?", 400);
  const signal = AbortSignal.any([request.signal, AbortSignal.timeout(22_000)]);
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return failure("Kahve seçkisine şu anda ulaşamıyorum. Biraz sonra tekrar deneyebilir misin?", 503);
    const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await supabase.from("products")
      .select("id,name,origin,tasting_notes,roast_level,price,in_stock,created_at")
      .order("id").limit(100).abortSignal(signal);
    if (error || !data) return failure("Kahve seçkisine şu anda ulaşamıyorum. Biraz sonra tekrar deneyebilir misin?", 503);
    const products = data as Product[];
    if (!products.some((p) => p.in_stock)) {
      return Response.json({ message: "Şu anda stokta önerebileceğim bir kahve bulunmuyor. Yeni kavrumlar için yakında tekrar uğrayabilirsin.", recommendations: [] }, { headers: privateHeaders });
    }
    // The SDK also resolves rotating OIDC from Vercel's request context.
    // Checking process.env alone would reject valid deployed requests.
    const draft = await generateCoffeeReply(products, messages, signal);
    return Response.json(resolveReply(draft, products), { headers: privateHeaders });
  } catch (error) {
    const status = typeof error === "object" && error !== null && "statusCode" in error ? error.statusCode : undefined;
    const category = providerErrorCode(error);
    // Provider responses can contain request text or credentials. Log codes only.
    console.error("coffee_assistant_unavailable", JSON.stringify({ status: typeof status === "number" ? status : "generation_failed", category, timeout: signal.aborted }));
    return failure(category === "authentication_error" || status === 401 || status === 403
      ? "Kahve asistanı şu anda kullanıma hazır değil. Kahvelerimizi seçkiden keşfedebilirsin."
      : signal.aborted
      ? "Yanıt biraz uzun sürdü. Lütfen tekrar dene."
      : "Şu anda yanıt hazırlayamıyorum. Biraz sonra tekrar deneyebilir veya kahve seçkimize göz atabilirsin.", 503);
  }
}
