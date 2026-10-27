import type { Product } from "@/lib/supabase/products";

export function formatPrice(price: Product["price"]): string {
  const numericPrice = typeof price === "number" ? price : Number(price);

  if (!Number.isFinite(numericPrice)) return `${price} ₺`;

  return `${new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericPrice)} ₺`;
}
