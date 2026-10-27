import Image from "next/image";
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
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main id="main-content">
      <section className="relative isolate overflow-hidden bg-cream">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1600px] lg:h-[calc(100svh-5rem)] lg:min-h-[38rem] lg:max-h-[52rem] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative z-10 flex items-center px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-12 xl:pl-[max(2.5rem,calc((100vw-80rem)/2))]">
            <div className="max-w-2xl">
              <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-leaf sm:mb-5">
                <span className="h-px w-8 bg-leaf" /> Moda&apos;da 2019&apos;dan beri
              </p>
              <h1 className="font-display text-[clamp(3rem,5.5vw,5.45rem)] font-bold leading-[0.9] tracking-[-0.06em] text-espresso">
                Taze kavrulur,
                <span className="block italic text-roast">hızlı tükenir.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-espresso/70 sm:mt-6 sm:text-lg sm:leading-8">
                Moda&apos;daki kavurucumuzdan, siparişiniz için küçük partiler halinde kavrulan karakterli ve izlenebilir kahveler.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:gap-4">
                <Link href="/kahvelerimiz" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-roast px-8 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(200,100,43,0.28)] transition hover:-translate-y-0.5 hover:bg-roast-dark hover:shadow-[0_16px_34px_rgba(200,100,43,0.34)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roast sm:min-h-16 sm:px-9">
                  Kahvelerimizi gör <ArrowIcon />
                </Link>
                <Link href="/toptan" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-espresso px-8 py-4 text-base font-bold text-cream shadow-[0_12px_30px_rgba(43,29,20,0.2)] transition hover:-translate-y-0.5 hover:bg-leaf hover:shadow-[0_16px_34px_rgba(43,29,20,0.26)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso sm:min-h-16 sm:px-9">
                  Toptan teklif al
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[28rem] lg:min-h-full">
            <Image src="/images/furks-roastery-hero.png" alt="Kavurma makinesinde taze kahve çekirdeklerini kontrol eden Furks Kahve kavurucusu" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-[62%_center]" />
            <div className="absolute inset-0 bg-cream/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-cream/30 via-transparent to-espresso/5 lg:from-cream/45" />
            <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-espresso/75 px-4 py-3 text-cream shadow-lg backdrop-blur sm:bottom-7 sm:left-7 sm:px-5 sm:py-4">
              <p className="text-xl font-bold sm:text-2xl">Aynı hafta</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/65">Kavrulur ve yola çıkar</p>
            </div>
          </div>
        </div>
      </section>

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
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-roast">Bu hafta kavrulanlar</p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-[-0.045em] text-espresso sm:text-6xl">Her fincanda başka bir hikâye.</h2>
            </div>
            <Link href="/kahvelerimiz" className="inline-flex items-center gap-2 text-sm font-bold text-espresso underline decoration-roast decoration-2 underline-offset-8">Tüm kahveler <ArrowIcon /></Link>
          </div>

          <Suspense fallback={<FeaturedCoffeesLoading />}>
            <FeaturedCoffees />
          </Suspense>
        </div>
      </section>

      <WhyFurks />

      <section className="overflow-hidden bg-leaf py-20 text-cream sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-roast-light">Bizim hikâyemiz</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">On beş metrekareden kırktan fazla işletmeye.</h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-cream/75 sm:text-lg">2019&apos;da Moda&apos;da beş kiloluk bir kavurma makinesiyle başladık. Makinemiz büyüdü, ekibimiz altı kişiye ulaştı; ama kuralımız değişmedi: sipariş gelmeden kavurmuyoruz.</p>
            <Link href="/hikayemiz" className="mt-8 inline-flex items-center gap-3 rounded-full border border-cream/35 px-6 py-3.5 text-sm font-bold transition hover:bg-cream hover:text-leaf">Hikâyemizi oku <ArrowIcon /></Link>
          </div>
          <div className="relative min-h-72">
            <div className="absolute left-4 top-0 size-52 rounded-full border border-cream/20 sm:size-72" />
            <div className="absolute bottom-0 right-0 size-52 rounded-full bg-roast sm:size-64" />
            <div className="absolute left-1/2 top-1/2 grid size-48 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cream/30 bg-leaf text-center shadow-2xl sm:size-60">
              <div><strong className="font-display text-6xl italic sm:text-7xl">2019</strong><span className="mt-2 block text-xs font-bold uppercase tracking-[0.2em] text-cream/60">Moda, İstanbul</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-roast">Fincandan duyduklarımız</p><h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.045em] text-espresso sm:text-6xl">İyi kahve konuşulur.</h2></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
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
