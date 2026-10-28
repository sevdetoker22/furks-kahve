import Link from "next/link";
import { AdminNavigation } from "@/components/admin/admin-navigation";
import { CoffeeImage } from "@/components/products/coffee-image";
import { requireAdmin } from "@/lib/admin/session";
import { getAdminProducts, productsPerPage } from "@/lib/admin/products";
import { formatPrice } from "@/lib/products/format";
import { logoutAdmin } from "../actions";
import { refreshAdminProducts } from "./actions";

const buttonClass = "inline-flex min-h-11 items-center justify-center rounded-sm border border-espresso/20 px-4 py-2 text-sm font-semibold transition-colors hover:border-leaf hover:text-leaf focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-roast";
const notices: Record<string, string> = {
  created: "Yeni kahve eklendi. Kahve listesi güncellendi.",
  updated: "Kahve bilgileri kaydedildi. Kahve listesi güncellendi.",
  deleted: "Kahve listeden kaldırıldı.",
};

export default async function AdminProductsPage({ searchParams }: {
  searchParams: Promise<{ page?: string | string[]; notice?: string | string[] }>;
}) {
  const { name } = await requireAdmin();
  const params = await searchParams;
  const page = typeof params.page === "string" && /^\d{1,5}$/.test(params.page) ? Math.max(1, Number(params.page)) : 1;
  const { products, total, failed } = await getAdminProducts(page);
  const pages = Math.max(1, Math.ceil(total / productsPerPage));
  const notice = typeof params.notice === "string" ? notices[params.notice] : undefined;

  return (
    <main id="main-content" className="min-h-[calc(100svh-5rem)] bg-[#fffaf2]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-wrap items-start justify-between gap-5 border-b border-espresso/15 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-roast">Furks Coffee / Yönetim</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.045em]">Kahveler</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-espresso/65">Merhaba {name}. Kahve seçkinizi, fiyatları ve stok durumunu buradan güncelleyebilirsiniz.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <form action={refreshAdminProducts}><button className={buttonClass}>Listeyi yenile</button></form>
            <form action={logoutAdmin}><button className={buttonClass}>Çıkış yap</button></form>
          </div>
        </div>
        <AdminNavigation active="products" />
        {notice ? <p role="status" className="mb-6 border-l-2 border-leaf bg-leaf/5 px-4 py-3 text-sm leading-7 text-leaf">{notice}</p> : null}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-espresso/65">{failed ? "Kahve seçkisi" : <><strong className="text-espresso">{total}</strong> kahve · Fiyatlar 250 g içindir.</>}</p>
          <Link href="/admin/kahveler/yeni" className="inline-flex min-h-11 items-center rounded-sm bg-leaf px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-espresso focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-roast">+ Yeni kahve ekle</Link>
        </div>
        {failed ? (
          <p role="alert" className="border-l-2 border-roast pl-4 text-sm leading-7 text-roast-dark">Kahveler şu anda yüklenemedi. Lütfen listeyi yenileyerek tekrar deneyin.</p>
        ) : products.length === 0 ? (
          <div className="border-y border-espresso/15 py-14 text-center">
            <h2 className="font-display text-2xl font-bold">{total === 0 ? "İlk kahvenizi ekleyin." : "Bu sayfada kahve bulunmuyor."}</h2>
            <p className="mt-3 text-sm leading-7 text-espresso/65">{total === 0 ? "Eklediğiniz kahveler sitenin kahve listesinde görünür." : "Kahveleri görmek için ilk sayfaya dönün."}</p>
            {total > 0 ? <Link href="/admin/kahveler" className="mt-5 inline-block text-sm font-semibold text-leaf underline underline-offset-4">İlk sayfaya dön</Link> : null}
          </div>
        ) : (
          <ul className="divide-y divide-espresso/10 border-y border-espresso/15">
            {products.map((product) => (
              <li key={product.id} className="flex flex-wrap items-center gap-4 py-5 sm:gap-6">
                <div className="w-16 shrink-0 sm:w-20"><CoffeeImage product={product} /></div>
                <div className="min-w-0 flex-1 basis-40">
                  <h2 className="break-words font-display text-xl font-bold sm:text-2xl">{product.name}</h2>
                  <p className="mt-1 break-words text-sm leading-6 text-espresso/60">{product.origin} · {product.roast_level} kavrum</p>
                  <p className="mt-1 break-words text-xs leading-6 text-espresso/55">{product.tasting_notes}</p>
                </div>
                <div className="min-w-24">
                  <p className="text-base font-semibold">{formatPrice(product.price)}</p>
                  <p className={`mt-1 text-xs font-semibold ${product.in_stock ? "text-leaf" : "text-roast-dark"}`}>{product.in_stock ? "Stokta var" : "Tükendi"}</p>
                </div>
                <Link href={`/admin/kahveler/${product.id}`} prefetch={false} className={buttonClass} aria-label={`${product.name} kahvesini düzenle`}>Düzenle <span aria-hidden="true" className="ml-3">↗</span></Link>
              </li>
            ))}
          </ul>
        )}
        {pages > 1 && products.length > 0 ? (
          <nav aria-label="Kahve sayfaları" className="mt-7 flex items-center justify-between gap-4 text-sm">
            <div>{page > 1 ? <Link href={`/admin/kahveler?page=${page - 1}`} prefetch={false} className={buttonClass}>Önceki</Link> : null}</div>
            <span>Sayfa {page} / {pages}</span>
            <div>{page < pages ? <Link href={`/admin/kahveler?page=${page + 1}`} prefetch={false} className={buttonClass}>Sonraki</Link> : null}</div>
          </nav>
        ) : null}
        <p className="mt-7 text-xs leading-6 text-espresso/55">Kaydettiğiniz bilgiler kahve listesine ve toptan formundaki kahve seçeneklerine yansır. Ana sayfadaki seçili kahvelerin bilgileri de güncellenir.</p>
      </div>
    </main>
  );
}
