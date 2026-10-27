import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/lib/supabase/products";
import { WholesaleForm } from "./wholesale-form";

export const metadata: Metadata = {
  title: "Toptan Kahve | Furks Kahve",
  description:
    "İşletmenizin kahve ihtiyacını birlikte planlayalım. Aylık 5 kg’dan başlayan taze kavrum, düzenli tedarik ve size özel fiyatlandırma.",
};

const benefits = [
  {
    number: "01",
    title: "Size özel fiyatlandırma",
    description:
      "Aylık 5 kg ve üzeri siparişlerde işletmenize uygun fiyatlandırma.",
  },
  {
    number: "02",
    title: "Taze kavrum",
    description: "Düzenli kavrum ve planlı kahve tedariki.",
  },
  {
    number: "03",
    title: "Teslimat kolaylığı",
    description: "Kadıköy içindeki işletmelere ücretsiz teslimat.",
  },
  {
    number: "04",
    title: "Barista desteği",
    description: "Öğütüm, reçete ve makine ayarlarında destek.",
  },
];

async function ProductInquiryForm({ searchParams }: Pick<PageProps<"/toptan">, "searchParams">) {
  const [query, { products }] = await Promise.all([searchParams, getProducts()]);
  const selectedProductId = typeof query.product === "string" ? query.product : "";
  return (
    <WholesaleForm
      key={selectedProductId}
      products={products.map(({ id, name }) => ({ id, name }))}
      selectedProductId={selectedProductId}
    />
  );
}

export default function WholesalePage({ searchParams }: PageProps<"/toptan">) {
  return (
    <main id="main-content" className="bg-[#fffaf2]">
      <section
        aria-labelledby="wholesale-heading"
        className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.85fr_1.35fr] lg:gap-14 lg:px-10 lg:py-12 xl:gap-20"
      >
        <div className="lg:pt-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-leaf">
            Furks Coffee / Toptan
          </p>
          <h1
            id="wholesale-heading"
            className="mt-4 max-w-md font-display text-4xl font-bold leading-[1.12] tracking-[-0.045em] text-espresso sm:text-[2.75rem]"
          >
            İyi kahve,
            <br />
            <span className="font-normal italic">iyi iş ortaklığı.</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-7 text-espresso/70 sm:text-base">
            İşletmenizin kahve ihtiyacını birlikte planlayalım. Taze kavrum,
            düzenli tedarik ve size özel fiyatlandırma.
          </p>
          <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-espresso/15 pt-4 text-xs text-espresso/65 sm:mt-7 sm:text-sm lg:max-w-sm">
            <span className="font-semibold text-espresso">5 kg / ay</span>
            <span aria-hidden="true">—</span>
            Toptan sipariş başlangıcı
          </p>
        </div>

        <div id="talep-formu" className="min-w-0 scroll-mt-28 border-t border-espresso/15 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0 xl:pl-14">
          <h2
            id="wholesale-form-heading"
            className="font-display text-2xl font-bold leading-tight tracking-[-0.035em] text-espresso sm:text-[1.75rem]"
          >
            İşletmeniz için teklif alın.
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-espresso/65">
            Kısa formu doldurun, size uygun kahve ve tedarik seçeneklerini
            birlikte değerlendirelim.
          </p>
          <Suspense fallback={<p className="mt-5 text-sm text-espresso/60" role="status">Talep formu hazırlanıyor…</p>}>
            <ProductInquiryForm searchParams={searchParams} />
          </Suspense>
        </div>
      </section>

      <section
        aria-labelledby="wholesale-benefits-heading"
        className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 sm:pb-12 lg:px-10"
      >
        <div className="border-t border-espresso/15 pt-7 sm:pt-8">
          <h2
            id="wholesale-benefits-heading"
            className="font-display text-2xl font-bold tracking-[-0.035em] text-espresso"
          >
            İşletmeniz için düşündük.
          </h2>
          <ol className="mt-5 grid divide-y divide-espresso/15 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {benefits.map((benefit) => (
              <li
                key={benefit.number}
                className="py-4 first:pt-0 last:pb-0 lg:px-6 lg:py-0 lg:first:pl-0 lg:last:pr-0"
              >
                <span className="text-xs font-semibold tracking-[0.1em] text-roast">
                  {benefit.number}
                </span>
                <h3 className="mt-2 text-sm font-bold text-espresso">
                  {benefit.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-espresso/65">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
