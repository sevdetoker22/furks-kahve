import { HomeHero } from "@/components/home/home-hero";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/products/product-card";
import { WhyFurks } from "@/components/home/why-furks";
import { getFeaturedProducts } from "@/lib/supabase/products";

const testimonials = [
  { quote: "Espresso No. 12'ye geçtikten sonra müşterilerimiz neyi değiştirdiğimizi sordu.", name: "Ece T.", role: "Kıyı Kafe" },
  { quote: "Sipariş verdiğimiz hafta kavrulmuş kahve geliyor. Bunu başka yerde bulamadık.", name: "Barış A.", role: "Ofis yöneticisi" },
  { quote: "Makine ayarı için dükkâna kadar geldiler. Tedarikçiden fazlası oldular.", name: "Selin K.", role: "Limon Bahçe Restoran" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeaturedCoffeesLoading() {
  return (
    <div
      className="mt-12 grid gap-6 md:grid-cols-3"
      aria-label="Öne çıkan kahveler yükleniyor"
      aria-busy="true"
    >
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[2rem] border border-espresso/10 bg-cream"
        >
          <div className="aspect-[4/3] animate-pulse bg-espresso/10" />
          <div className="space-y-4 p-7">
            <div className="h-3 w-2/5 animate-pulse rounded-full bg-leaf/15" />
            <div className="h-7 w-3/4 animate-pulse rounded-full bg-espresso/15" />
            <div className="h-4 w-full animate-pulse rounded-full bg-espresso/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function FeaturedCoffees() {
  await connection();
  const { products, error } = await getFeaturedProducts();

  if (error) {
    return (
      <div
        role="alert"
        className="mt-12 rounded-[2rem] border border-roast/20 bg-cream px-6 py-10 text-center"
      >
        <p className="font-display text-2xl font-bold text-espresso">
          Öne çıkan kahveler şu anda yüklenemedi.
        </p>
        <p className="mt-3 text-sm leading-6 text-espresso/60">
          Tüm seçkiyi daha sonra tekrar görüntüleyebilirsiniz.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mt-12 rounded-[2rem] border border-espresso/10 bg-cream px-6 py-10 text-center">
        <p className="font-display text-2xl font-bold text-espresso">
          Bu hafta için öne çıkan kahve bulunmuyor.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main id="main-content">
      <HomeHero />

      <section className="bg-espresso text-cream" aria-label="Furks Kahve sayılarla">
        <div className="mx-auto grid max-w-7xl divide-y divide-cream/15 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
          {[["250 kg", "Haftalık kavurma"], ["40+", "Kafe ve ofis"], ["6 kişi", "Küçük, uzman ekip"]].map(([value, label]) => (
            <div key={label} className="flex items-baseline justify-center gap-3 py-7 sm:py-9">
              <strong className="font-display text-3xl text-roast-light sm:text-4xl">{value}</strong>
              <span className="text-xs uppercase tracking-[0.15em] text-cream/55">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf2] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-2xl font-display text-4xl font-bold tracking-[-0.045em] text-espresso sm:text-6xl">En popüler 3 kahvemiz</h2>
            <Link href="/kahvelerimiz" className="inline-flex items-center gap-2 text-sm font-bold text-espresso underline decoration-roast decoration-2 underline-offset-8">Tüm kahveler <ArrowIcon /></Link>
          </div>

          <Suspense fallback={<FeaturedCoffeesLoading />}>
            <FeaturedCoffees />
          </Suspense>
        </div>
      </section>

      <WhyFurks />

      <section id="fincandan-duyduklarimiz" aria-labelledby="home-testimonials-heading" className="scroll-mt-20 bg-[#fffaf2] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div>
            <h2 id="home-testimonials-heading" className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.06em] text-espresso lg:text-[clamp(4rem,5vw,4.5rem)]">Fincandan Duyduklarımız</h2>
            <p className="mt-4 text-lg font-normal leading-relaxed text-espresso/65 sm:text-[clamp(1.375rem,1.8vw,1.5rem)]">İyi kahve konuşulur.</p>
          </div>
          <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <figure key={testimonial.name} className={`rounded-[2rem] p-7 sm:p-9 ${index === 1 ? "bg-roast text-white" : "bg-cream text-espresso"}`}>
                <span className={`font-display text-6xl leading-none ${index === 1 ? "text-white/35" : "text-roast/40"}`} aria-hidden="true">“</span>
                <blockquote className="-mt-3 font-display text-2xl font-bold leading-snug tracking-[-0.02em]">{testimonial.quote}</blockquote>
                <figcaption className={`mt-8 border-t pt-5 text-sm ${index === 1 ? "border-white/20 text-white/75" : "border-espresso/15 text-espresso/60"}`}><strong className={index === 1 ? "text-white" : "text-espresso"}>{testimonial.name}</strong> · {testimonial.role}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
