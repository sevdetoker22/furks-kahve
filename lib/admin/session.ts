import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/server";

// Supabase Auth uses an email identifier internally; the owner enters a username.
// This reserved address is not a mailbox and is never used to send messages.
export const ownerLogin = {
  name: "Deniz Yalın",
  email: "deniz.yalin@furks-admin.invalid",
};

export function matchesOwnerName(value: string) {
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("tr-TR")
    === ownerLogin.name.toLocaleLowerCase("tr-TR");
}

export const getAdminSession = cache(async () => {
  const supabase = await createSessionClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user || user.is_anonymous || user.app_metadata.role !== "admin") {
    return null;
  }

  return { supabase, name: ownerLogin.name };
});

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/giris");
  return session;
}
