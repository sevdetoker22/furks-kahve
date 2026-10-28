import { notFound } from "next/navigation";
import { CoffeeEditor } from "@/components/admin/coffee-editor";
import { getAdminProduct } from "@/lib/admin/products";
import { isProductId } from "@/lib/admin/product-form";
import { requireAdmin } from "@/lib/admin/session";

export default async function EditCoffeePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!isProductId(id)) notFound();
  const product = await getAdminProduct(id);
  if (!product) notFound();
  return <CoffeeEditor product={product} />;
}
