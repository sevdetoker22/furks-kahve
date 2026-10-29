import Link from "next/link";
import { formatPrice } from "@/lib/products/format";
import type { Product } from "@/lib/supabase/products";
import { CoffeeImage } from "./coffee-image";

type ProductCardProps = {
  product: Product;
  showStock?: boolean;
};

export function ProductCard({
  product,
  showStock = false,
}: ProductCardProps) {
  return (
    <article className="h-full">
      <Link
        href={`/kahvelerimiz?product=${encodeURIComponent(String(product.id))}`}
        prefetch={false}
        aria-label={`${product.name} detaylarını gör`}
        className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-espresso/10 bg-cream shadow-[0_18px_50px_rgba(43,29,20,0.06)] transition hover:border-leaf/35 hover:shadow-[0_18px_50px_rgba(43,29,20,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-roast"
      >
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-[#faf7f0]">
          <div className="absolute inset-5 flex items-center justify-center sm:inset-6">
            <div className="aspect-square h-full max-w-full transition duration-700 motion-safe:group-hover:scale-105">
              <CoffeeImage product={product} />
            </div>
          </div>
          {product.roast_level && (
            <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-espresso backdrop-blur">
              {product.roast_level}
            </span>
          )}
          {showStock ? (
            <span
              className={`absolute right-4 top-4 rounded-full px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur ${
                product.in_stock ? "bg-leaf/90" : "bg-espresso/85"
              }`}
            >
              {product.in_stock ? "Var" : "Tükendi"}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          {product.origin && (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-leaf">
              {product.origin}
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
            <h3 className="min-w-0 font-display text-2xl font-bold tracking-[-0.03em] break-words text-espresso">
              {product.name}
            </h3>
            {product.price !== null && product.price !== "" && (
              <p className="shrink-0 text-sm font-bold text-roast">
                {formatPrice(product.price)}
              </p>
            )}
          </div>
          {product.tasting_notes && (
            <p className="mt-3 text-sm leading-6 text-espresso/60">
              {product.tasting_notes}
            </p>
          )}
          {showStock ? (
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-espresso/55">
              Stok: {product.in_stock ? "Var" : "Tükendi"}
            </p>
          ) : null}
          <p className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-bold text-leaf">
            Kahveyi keşfet
            <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
              <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
        </div>
      </Link>
    </article>
  );
}
