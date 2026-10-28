import Link from "next/link";
import { AdminNavigation } from "./admin-navigation";
import { ProductForm, DeleteProductForm } from "@/app/admin/kahveler/product-form";
import type { Product } from "@/lib/supabase/products";

export function CoffeeEditor({ product }: { product?: Product }) {
  return (
    <main id="main-content" className="min-h-[calc(100svh-5rem)] bg-[#fffaf2]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-roast">Furks Coffee / Yönetim</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.045em]">{product ? "Kahveyi düzenle" : "Yeni kahve ekle"}</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-espresso/65">{product ? "Değişiklikler kaydettiğinizde siteye yansır." : "Kahvenizin bilgilerini girin. Kaydettiğinizde kahve listesine eklenir."}</p>
        <AdminNavigation active="products" />
        <Link href="/admin/kahveler" className="mb-7 inline-block text-sm font-semibold text-leaf underline underline-offset-4">← Kahve listesine dön</Link>
        <ProductForm id={product ? String(product.id) : ""} initialValues={{
          name: product?.name ?? "", origin: product?.origin ?? "", tasting_notes: product?.tasting_notes ?? "",
          roast_level: product?.roast_level ?? "", price: product ? String(product.price).replace(".", ",") : "",
          in_stock: product?.in_stock ?? true,
        }} />
        {!product ? <p className="mt-6 max-w-lg text-xs leading-6 text-espresso/55">Yeni kahveler Furks kahve simgesiyle gösterilir. Mevcut kahvelerin görselleri korunur.</p> : null}
        {product ? <DeleteProductForm id={String(product.id)} name={product.name} /> : null}
      </div>
    </main>
  );
}
