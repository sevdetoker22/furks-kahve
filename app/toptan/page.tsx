import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/lib/supabase/products";
import { WholesaleForm } from "./wholesale-form";

export const metadata: Metadata = {
  title: "Toptan Kahve | Furks Kahve",
  description:
    "İşletmenizin kahve ihtiyacını birlikte planlayalım. Taze kavrum, düzenli tedarik ve size özel fiyatlandırma.",
};

const benefits = [
  {
    title: "Size özel fiyatlandırma",
    description: "Kahve ihtiyacınıza uygun teklif.",
  },
  {
    title: "Taze kavrum",
    description: "Düzenli kavrum, planlı tedarik.",
  },
  {
    title: "Teslimat kolaylığı",
    description: "Kadıköy’deki işletmelere ücretsiz teslimat.",
  },
  {
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
        className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[0.85fr_1.35fr] lg:gap-14 lg:px-10 lg:py-12 xl:gap-20"
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
            İşletmenizin ihtiyacına uygun kahveyi ve tedarik planını birlikte
            belirleyelim.
          </p>

          <section
            aria-labelledby="wholesale-benefits-heading"
            className="mt-7 border-t border-espresso/15 pt-5 sm:mt-8 sm:pt-6 lg:max-w-sm"
          >
            <h2
              id="wholesale-benefits-heading"
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf"
            >
              İş ortaklığımız
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1 lg:gap-y-4">
              {benefits.map((benefit) => (
                <li key={benefit.title}>
                  <h3 className="text-[13px] font-semibold leading-5 text-espresso">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-5 text-espresso/65">
                    {benefit.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
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

    </main>
  );
}
