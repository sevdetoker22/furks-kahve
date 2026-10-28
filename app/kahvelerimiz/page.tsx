import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { CoffeeCarousel } from "@/components/products/coffee-carousel";
import styles from "@/components/products/coffee-catalog.module.css";
import { getProducts } from "@/lib/supabase/products";

export const metadata: Metadata = {
  title: "Kahvelerimiz | Furks Kahve",
  description:
    "Farklı karakterler, özgün aromalar. Furks Kahve'nin taze kavrulan çekirdeklerini keşfedin, size en yakın kahveyi bulun.",
};

function ProductsLoading() {
  return (
    <div
      className={styles.loading}
      role="status"
      aria-label="Kahveler yükleniyor"
      aria-busy="true"
    >
      <div className={styles.loadingRow} aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className={styles.loadingItem}>
            <div className={styles.loadingCircle} />
            <div className={styles.loadingName} />
          </div>
        ))}
      </div>
      <p>Kahveler hazırlanıyor…</p>
    </div>
  );
}

async function ProductsCatalog() {
  await connection();
  const { products, error } = await getProducts();

  if (error) {
    return (
      <div role="alert" className={styles.message}>
        <p className={styles.eyebrow}>Bağlantı hatası</p>
        <h2>Kahveler şu anda yüklenemedi.</h2>
        <p>Lütfen kısa bir süre sonra tekrar deneyin.</p>
        <a href="/kahvelerimiz">Yeniden dene</a>
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className={styles.message} role="status">
        <p className={styles.eyebrow}>Yeni kavrumlar hazırlanıyor</p>
        <h2>Henüz listelenecek kahve bulunmuyor.</h2>
        <p>Yeni çekirdekler eklendiğinde burada görebileceksiniz.</p>
      </div>
    );
  }
  return <CoffeeCarousel products={products} />;
}

export default function CoffeesPage() {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Furks Kahve · Kahve seçkimiz</p>
          <h1>
            Her Fincanın <em>Bir Hikâyesi Var.</em>
          </h1>
          <p>Farklı karakterler. Özgün aromalar. Sana en yakın olanı keşfet.</p>
        </div>
        <Suspense fallback={<ProductsLoading />}>
          <ProductsCatalog />
        </Suspense>
      </div>
    </main>
  );
}
