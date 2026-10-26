import Image from "next/image";
import Link from "next/link";

const featuredCoffees = [
  { name: "Moda Blend", origin: "Brezilya · Kolombiya", notes: "Fındık, sütlü çikolata, karamel", roast: "Orta kavrum", price: "420 ₺", position: "left" },
  { name: "Etiyopya Yirgacheffe", origin: "Etiyopya", notes: "Yasemin, bergamot, şeftali", roast: "Açık kavrum", price: "540 ₺", position: "center" },
  { name: "Espresso No. 12", origin: "Brezilya · Guatemala · Etiyopya", notes: "Bitter çikolata, kavrulmuş fındık, pekmez", roast: "Koyu kavrum", price: "440 ₺", position: "right" },
];

const reasons = [
  { number: "01", title: "Sipariş üzerine", description: "Kahveyi sipariş geldikten sonra kavuruyoruz; rafta bekletmiyoruz." },
  { number: "02", title: "İzlenebilir kahve", description: "Her kahvenin hangi çiftlikten ve hangi hasattan geldiğini biliyoruz." },
  { number: "03", title: "Yanınızda destek", description: "Toptan müşterilerimize makine ayarı ve barista eğitimi desteği veriyoruz." },
];

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

export default function Home() {
  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden bg-cream">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1600px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10 flex items-center px-5 py-20 sm:px-8 lg:px-10 lg:py-24 xl:pl-[max(2.5rem,calc((100vw-80rem)/2))]">
            <div className="max-w-2xl">
              <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-leaf">
                <span className="h-px w-8 bg-leaf" /> Moda&apos;da 2019&apos;dan beri
              </p>
              <h1 className="font-display text-[clamp(3.6rem,8vw,7.8rem)] font-bold leading-[0.86] tracking-[-0.065em] text-espresso">
                Taze kavrulur,
                <span className="block italic text-roast">hızlı tükenir.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-espresso/70 sm:text-lg">
                Moda&apos;daki kavurucumuzdan, siparişiniz için küçük partiler halinde kavrulan karakterli ve izlenebilir kahveler.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/kahvelerimiz" className="inline-flex items-center justify-center gap-3 rounded-full bg-roast px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-roast-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roast">
                  Kahvelerimizi gör <ArrowIcon />
                </Link>
                <Link href="/toptan" className="inline-flex items-center justify-center gap-3 rounded-full border border-espresso/25 px-7 py-4 text-sm font-bold text-espresso transition hover:-translate-y-0.5 hover:border-espresso hover:bg-espresso hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso">
                  Toptan teklif al
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[30rem] overflow-hidden lg:min-h-full">
            <Image src="/images/furks-roastery-hero.png" alt="Kavurma makinesinde taze kahve çekirdeklerini kontrol eden Furks Kahve kavurucusu" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-[62%_center]" />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/25 via-transparent to-transparent lg:from-espresso/10" />
            <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-espresso/85 px-5 py-4 text-cream shadow-xl backdrop-blur sm:bottom-8 sm:left-8">
              <p className="text-2xl font-bold">Aynı hafta</p>
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

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredCoffees.map((coffee) => (
              <article key={coffee.name} className="group overflow-hidden rounded-[2rem] border border-espresso/10 bg-cream shadow-[0_18px_50px_rgba(43,29,20,0.06)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/featured-coffees.png" alt={`${coffee.name} kahvesinin tadım notlarını anlatan natürmort`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: coffee.position }} />
                  <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-espresso backdrop-blur">{coffee.roast}</span>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-leaf">{coffee.origin}</p>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-espresso">{coffee.name}</h3>
                    <p className="shrink-0 text-sm font-bold text-roast">{coffee.price}</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-espresso/60">{coffee.notes}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-leaf">Neden Furks?</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.045em] text-espresso sm:text-6xl">Tazeliği şansa bırakmıyoruz.</h2>
              <p className="mt-6 max-w-md text-base leading-8 text-espresso/65">İyi kahvenin yalnızca çekirdekle değil; doğru kavurma, şeffaf kaynak ve sürekli destekle mümkün olduğuna inanıyoruz.</p>
            </div>
            <ol className="divide-y divide-espresso/15 border-y border-espresso/15">
              {reasons.map((reason) => (
                <li key={reason.number} className="grid gap-4 py-7 sm:grid-cols-[4rem_1fr] sm:py-9">
                  <span className="font-display text-xl italic text-roast">{reason.number}</span>
                  <div><h3 className="font-display text-2xl font-bold text-espresso sm:text-3xl">{reason.title}</h3><p className="mt-3 max-w-xl leading-7 text-espresso/65">{reason.description}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

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

      <section className="bg-roast px-5 py-20 text-white sm:px-8 sm:py-24">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65">Kafeniz, restoranınız veya ofisiniz için</p>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-[-0.05em] sm:text-6xl">Birlikte iyi kahve demleyelim.</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75">Aylık 5 kg ve üzeri siparişlerde özel fiyat, Kadıköy içi ücretsiz teslimat ve ekibinize barista eğitimi.</p>
          <Link href="/toptan" className="mt-9 inline-flex items-center gap-3 rounded-full bg-espresso px-7 py-4 text-sm font-bold text-cream transition hover:-translate-y-0.5 hover:bg-leaf">Toptan teklif al <ArrowIcon /></Link>
        </div>
      </section>
    </main>
  );
}
