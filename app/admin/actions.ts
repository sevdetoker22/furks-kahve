"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { matchesOwnerName, ownerLogin, requireAdmin } from "@/lib/admin/session";
import { createSessionClient } from "@/lib/supabase/server";

export type LoginState = { message: string; username: string };

export async function loginAdmin(_state: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim().slice(0, 100);
  const password = formData.get("password");
  const invalid = { username, message: "Kullanıcı adı veya şifre hatalı." };

  if (!matchesOwnerName(username) || typeof password !== "string" || password.length < 6 || password.length > 1024) {
    return invalid;
  }

  try {
    const supabase = await createSessionClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: ownerLogin.email,
      password,
    });

    if (error || !data.user) {
      return error?.status === 429
        ? { username, message: "Çok fazla giriş denemesi yapıldı. Lütfen biraz sonra tekrar deneyin." }
        : invalid;
    }

    // Only server-managed app_metadata grants access. user_metadata is not trusted.
    if (data.user.is_anonymous || data.user.app_metadata.role !== "admin") {
      await supabase.auth.signOut({ scope: "local" });
      return invalid;
    }
  } catch {
    return { username, message: "Şu anda giriş yapılamıyor. Lütfen tekrar deneyin." };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) throw new Error("Çıkış yapılamadı. Lütfen tekrar deneyin.");
  redirect("/admin/giris");
}

export async function refreshAdminRequests() {
  await requireAdmin();
  revalidatePath("/admin");
}
