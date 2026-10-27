import Image from "next/image";
import { formatPrice, type Product } from "@/lib/supabase/products";

const imagePositions = ["left", "center", "right"] as const;

type ProductCardProps = {
  product: Product;
  index: number;
  showStock?: boolean;
};

export function ProductCard({
  product,
  index,
  showStock = false,
}: ProductCardProps) {
  const imagePosition = imagePositions[index % imagePositions.length];

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-espresso/10 bg-cream shadow-[0_18px_50px_rgba(43,29,20,0.06)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src="/images/featured-coffees.png"
          alt={`${product.name} kahvesinin tadım notlarını anlatan natürmort`}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          style={{ objectPosition: imagePosition }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-espresso backdrop-blur">
          {product.roast_level}
        </span>
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
      <div className="p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-leaf">
          {product.origin}
        </p>
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-espresso">
            {product.name}
          </h3>
          <p className="shrink-0 text-sm font-bold text-roast">
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="mt-3 text-sm leading-6 text-espresso/60">
          {product.tasting_notes}
        </p>
        {showStock ? (
          <p className="mt-5 border-t border-espresso/10 pt-4 text-xs font-bold uppercase tracking-[0.14em] text-espresso/55">
            250 g · Stok: {product.in_stock ? "Var" : "Tükendi"}
          </p>
        ) : null}
      </div>
    </article>
  );
}
