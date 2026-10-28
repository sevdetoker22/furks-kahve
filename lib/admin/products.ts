import "server-only";

import { requireAdmin } from "./session";
import type { Product } from "@/lib/supabase/products";

export const adminProductColumns = "id,name,origin,tasting_notes,roast_level,price,in_stock,created_at";
export const productsPerPage = 20;

export async function getAdminProducts(page: number) {
  const { supabase } = await requireAdmin();
  const from = (page - 1) * productsPerPage;
  const { data, error, count } = await supabase.from("products")
    .select(adminProductColumns, { count: "exact" })
    .order("created_at", { ascending: true }).order("id", { ascending: true })
    .range(from, from + productsPerPage - 1);

  return { products: (data ?? []) as Product[], total: count ?? 0, failed: Boolean(error) };
}

export async function getAdminProduct(id: string) {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.from("products")
    .select(adminProductColumns).eq("id", id).maybeSingle();
  if (error) throw new Error("Kahve bilgileri yüklenemedi.");
  return data as Product | null;
}
