import Image from "next/image";
import { getCoffeeImage, type ImageRegion } from "@/lib/products/presentation";
import type { Product } from "@/lib/supabase/products";

export function ImageViewport({
  image,
  alt,
  sizes,
  eager = false,
  maxHeight,
}: {
  image: ImageRegion;
  alt: string;
  sizes: string;
  eager?: boolean;
  maxHeight?: number;
}) {
  const [left, top, width, height] = image.region;

  return (
    <span
      className="relative block w-full overflow-hidden"
      style={{
        aspectRatio: `${width} / ${height}`,
        maxWidth: maxHeight ? (maxHeight * width) / height : undefined,
      }}
    >
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        draggable={false}
        className="absolute max-w-none select-none"
        style={{
          width: `${(image.width / width) * 100}%`,
          height: "auto",
          left: `${(-left / width) * 100}%`,
          top: `${(-top / height) * 100}%`,
        }}
      />
    </span>
  );
}

export function CoffeeImage({
  product,
  detail = false,
  eager = false,
}: {
  product: Product;
  detail?: boolean;
  eager?: boolean;
}) {
  const image = getCoffeeImage(product.id);

  if (!image) {
    return (
      <span className="grid aspect-square w-full place-items-center rounded-full bg-[#163c2e] text-cream">
        <svg
          viewBox="0 0 100 100"
          className="w-1/3"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="25"
            ry="37"
            stroke="currentColor"
            strokeWidth="2"
            transform="rotate(35 50 50)"
          />
          <path
            d="M69 23C31 43 68 57 31 77"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </span>
    );
  }

  const scale = image.width / image.region[2];
  const sizes = detail
    ? `(min-width: 1024px) ${Math.ceil(470 * scale)}px, ${Math.ceil(80 * scale)}vw`
    : `(min-width: 1024px) ${Math.ceil(280 * scale)}px, (min-width: 640px) ${Math.ceil(33 * scale)}vw, ${Math.ceil(64 * scale)}vw`;

  return (
    <span className="block aspect-square w-full overflow-hidden rounded-full bg-[#123a2d]">
      <ImageViewport
        image={image}
        alt={`${product.name} — ${product.tasting_notes} notalarını temsil eden kahve sunumu`}
        sizes={sizes}
        eager={eager}
      />
    </span>
  );
}
