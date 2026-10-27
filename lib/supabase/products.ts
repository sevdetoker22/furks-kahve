import { supabase } from "@/lib/supabase/client";

export { formatPrice } from "@/lib/products/format";

const productColumns =
  "id,name,origin,tasting_notes,roast_level,price,in_stock,created_at";

export const featuredProductNames = [
  "Moda Blend",
  "Etiyopya Yirgacheffe",
  "Espresso No. 12",
] as const;

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
  const { data, error } = await supabase
    .schema("public")
    .from("products")
    .select(productColumns)
    .in("name", [...featuredProductNames]);

  if (error) {
    return { products: [], error: error.message };
  }

  const productsByName = new Map(
    ((data ?? []) as Product[]).map((product) => [product.name, product]),
  );
  const products = featuredProductNames.flatMap((name) => {
    const product = productsByName.get(name);
    return product ? [product] : [];
  });

  return { products, error: null };
}
