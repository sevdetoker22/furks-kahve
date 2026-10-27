import Link from "next/link";
import { formatPrice } from "@/lib/products/format";
import {
  getRoastIntensity,
  getTastingNotes,
} from "@/lib/products/presentation";
import type { Product } from "@/lib/supabase/products";
import { CoffeeImage } from "./coffee-image";
import { CoffeeTastingNotes } from "./coffee-tasting-notes";
import styles from "./coffee-catalog.module.css";

export function CoffeeDetailCard({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const intensity = getRoastIntensity(product.roast_level);
  const notes = getTastingNotes(product.tasting_notes).join(" · ");

  return (
    <article
      className={styles.detailCard}
      aria-labelledby="coffee-detail-title"
    >
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Kahve detayını kapat"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="m6 6 12 12M18 6 6 18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className={styles.detailVisual}>
        <div className={styles.visualCaption}>
          <span>Furks seçkisi</span>
          <span>250 g · Çekirdek kahve</span>
        </div>
        <div className={styles.detailImage}>
          <CoffeeImage product={product} detail />
        </div>
        <p className={styles.visualFooter}>Küçük partiler. Taze kavrum.</p>
      </div>

      <div className={styles.detailContent}>
        <p className={styles.eyebrow}>Kahvenin hikâyesi</p>
        <h2 id="coffee-detail-title">{product.name}</h2>
        <p className={styles.origin}>{product.origin}</p>
        <p className={styles.description}>
          {product.origin} kökenli çekirdekler,{" "}
          {product.roast_level.toLocaleLowerCase("tr-TR")} kavrumda kendine özgü
          karakterini buluyor. Fincanınızda keşfedeceğiniz notalar:{" "}
          {notes.toLocaleLowerCase("tr-TR")}.
        </p>

        <div className={styles.notesSection}>
          <h3 className={styles.eyebrow}>Tadım notları</h3>
          <CoffeeTastingNotes notes={product.tasting_notes} />
        </div>

        <dl className={styles.productFacts}>
          <div>
            <dt>Kavurma</dt>
            <dd>
              {intensity !== null && (
                <span className={styles.roastDots} aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} data-filled={index < intensity} />
                  ))}
                </span>
              )}
              <span className={styles.roastLabel}>{product.roast_level}</span>
            </dd>
          </div>
          <div>
            <dt>Ağırlık</dt>
            <dd>
              250 <span className={styles.unit}>g</span>
            </dd>
          </div>
          <div>
            <dt>Fiyat</dt>
            <dd>{formatPrice(product.price)}</dd>
          </div>
        </dl>

        <p className={styles.stock} data-in-stock={product.in_stock}>
          <span aria-hidden="true" /> Stok:{" "}
          {product.in_stock ? "Var" : "Tükendi"}
        </p>
        {!product.in_stock && (
          <p className={styles.stockNote}>
            Bu kahve şu anda tükendi. Yeni kavrum için toptan talep
            bırakabilirsiniz.
          </p>
        )}
        <Link
          href={`/toptan?product=${encodeURIComponent(String(product.id))}#talep-formu`}
          className={styles.quoteButton}
        >
          Toptan Teklif Al
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 10h12m-5-5 5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
