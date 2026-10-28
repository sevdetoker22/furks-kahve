import type { Product } from "../supabase/products";

export const MAX_MESSAGE_LENGTH = 600;
export const MAX_HISTORY_MESSAGES = 8;
export const MAX_BODY_BYTES = 16_000;

export type ChatMessage = { role: "user" | "assistant"; content: string };
export type RecommendationDraft = {
  message: string;
  recommendations: { productId: string; reason: string; matchedNotes: string[] }[];
};
export type CoffeeSuggestion = {
  id: string;
  name: string;
  origin: string;
  roastLevel: string;
  price: Product["price"];
  reason: string;
  matchedNotes: string[];
  href: string;
};
export type AssistantReply = { message: string; recommendations: CoffeeSuggestion[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isText(value: unknown, max: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

export function parseMessages(body: unknown): ChatMessage[] | null {
  if (!isRecord(body) || !Array.isArray(body.messages)) return null;
  if (body.messages.length < 1 || body.messages.length > MAX_HISTORY_MESSAGES + 1) return null;
  const messages: ChatMessage[] = [];
  let total = 0;
  for (const item of body.messages) {
    if (!isRecord(item) || (item.role !== "user" && item.role !== "assistant")) return null;
    if (!isText(item.content, item.role === "user" ? MAX_MESSAGE_LENGTH : 1_200)) return null;
    // A client cannot inject system messages or change the expected turn order.
    if (item.role !== (messages.length % 2 === 0 ? "user" : "assistant")) return null;
    total += item.content.length;
    messages.push({ role: item.role, content: item.content.trim() });
  }
  if (total > 6_000 || messages.at(-1)?.role !== "user") return null;
  return messages;
}

export function validateDraft(value: unknown, products: Product[]): RecommendationDraft | null {
  if (!isRecord(value) || !isText(value.message, 500) || !Array.isArray(value.recommendations)) return null;
  if (value.recommendations.length > 3) return null;
  const available = new Map(products.filter((p) => p.in_stock).map((p) => [String(p.id), p]));
  const ids = new Set<string>();
  const recommendations: RecommendationDraft["recommendations"] = [];

  for (const item of value.recommendations) {
    if (!isRecord(item) || typeof item.productId !== "string" || !isText(item.reason, 240)) return null;
    const product = available.get(item.productId);
    if (!product || !Array.isArray(item.matchedNotes)) return null;
    const notes = product.tasting_notes.split(/[,;·]/).map((note) => note.trim()).filter(Boolean);
    if (item.matchedNotes.length < 1 || item.matchedNotes.length > 3) return null;
    if (!item.matchedNotes.every((note) => typeof note === "string" && notes.includes(note))) return null;
    if (ids.has(item.productId)) continue;
    ids.add(item.productId);
    recommendations.push({
      productId: item.productId,
      reason: item.reason.trim(),
      matchedNotes: [...new Set(item.matchedNotes as string[])],
    });
  }
  return { message: value.message.trim(), recommendations };
}

export function resolveReply(draft: RecommendationDraft, products: Product[]): AssistantReply {
  // Revalidate at the boundary; names, prices and links always come from the DB.
  const checked = validateDraft(draft, products);
  if (!checked) throw new Error("Invalid coffee recommendations");
  return {
    message: checked.message,
    recommendations: checked.recommendations.map((suggestion) => {
      const product = products.find((p) => String(p.id) === suggestion.productId)!;
      return {
        id: String(product.id), name: product.name, origin: product.origin,
        roastLevel: product.roast_level, price: product.price,
        reason: suggestion.reason, matchedNotes: suggestion.matchedNotes,
        href: `/kahvelerimiz?product=${encodeURIComponent(String(product.id))}`,
      };
    }),
  };
}
