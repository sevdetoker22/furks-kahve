import "server-only";

import { requireAdmin } from "./session";

export const requestsPerPage = 20;

export type WholesaleRequest = {
  id: string;
  created_at: string;
  contact_name: string;
  business_name: string;
  business_type: string;
  email: string;
  phone: string;
  monthly_coffee_need: string | null;
  message: string | null;
};

export async function getAdminRequests(page: number) {
  // Authorization is enforced here as well as in the page, before any SELECT.
  const { supabase } = await requireAdmin();
  const from = (page - 1) * requestsPerPage;
  const { data, error, count } = await supabase
    .from("wholesale_requests")
    .select("id,created_at,contact_name,business_name,business_type,email,phone,monthly_coffee_need,message", { count: "exact" })
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .range(from, from + requestsPerPage - 1);

  return {
    requests: (data ?? []) as WholesaleRequest[],
    total: count ?? 0,
    failed: Boolean(error),
  };
}
