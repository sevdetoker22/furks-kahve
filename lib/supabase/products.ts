import { supabase } from "@/lib/supabase/client";
import { selectFeaturedProducts } from "@/lib/products/selection";

export { formatPrice } from "@/lib/products/format";

const productColumns =
  "id,name,origin,tasting_notes,roast_level,price,in_stock,created_at";

export type Product = {
  id: string | number;
  name: string;
  origin: string;
  tasting_notes: string;
  roast_level: string;
  price: number | string;
  in_stock: boolean;
  created_at: string;
};

export type ProductsResult = {
  products: Product[];
  error: string | null;
};

export async function getProducts(): Promise<ProductsResult> {
  const { data, error } = await supabase
    .schema("public")
    .from("products")
    .select(productColumns)
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    return { products: [], error: error.message };
  }

  return { products: (data ?? []) as Product[], error: null };
}

export async function getFeaturedProducts(): Promise<ProductsResult> {
  const { products, error } = await getProducts();
  return { products: error ? [] : selectFeaturedProducts(products), error };
}
