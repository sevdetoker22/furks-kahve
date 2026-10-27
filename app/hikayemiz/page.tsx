import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hikâyemiz | Furks Kahve",
  description:
    "Furks Kahve'nin 2019'da Moda'da başlayan hikâyesini ve dört adımlı kavurma sürecini keşfedin.",
};

const roastingSteps = [
  {
    number: "01",
    title: "Seçiyoruz",
    description:
      "Her hasattan numune tadıyor, karakterini ve fincandaki potansiyelini beğendiğimiz kahveleri alıyoruz.",
  },
  {
    number: "02",
    title: "Kavuruyoruz",
    description:
      "Kahveleri küçük partiler halinde, her çekirdeğin kendine özgü profiline göre kavuruyoruz.",
  },
  {
    number: "03",
    title: "Dinlendiriyoruz",
    description:
      "Kavrulan kahveyi aromasının dengelenmesi ve doğru şekilde oturması için iki gün dinlendiriyoruz.",
  },
  {
    number: "04",
    title: "Yola çıkarıyoruz",
    description:
      "Dinlenen kahveyi paketliyor ve kavrulduğu hafta içinde size ulaşması için yola çıkarıyoruz.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StoryPage() {
  return (
    <main id="main-content">
      <section className="overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-[1600px] lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="flex items-center px-5 py-16 sm:px-8 sm:py-24 lg:px-10 xl:pl-[max(2.5rem,calc((100vw-80rem)/2))]">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-leaf">
                <span className="h-px w-8 bg-leaf" /> Moda, 2019
              </p>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[0.92] tracking-[-0.055em] text-espresso sm:text-7xl">
                Küçük bir dükkân,
                <span className="block italic text-roast">taze bir fikir.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-espresso/70 sm:text-lg">
                Mahallemizdeki kafelerin haftalar önce kavrulmuş kahve yerine
                taze kahve kullanabilmesi için yola çıktık.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-espresso/20 px-6 py-3 text-sm font-bold text-espresso transition hover:-translate-y-0.5 hover:border-roast hover:bg-roast hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roast"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="size-5"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M16 10H4m5-5-5 5 5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Ana sayfaya dön
              </Link>
            </div>
          </div>

          <div className="relative min-h-[28rem] overflow-hidden lg:min-h-full">
            <Image
              src="/images/furks-roastery-hero.png"
              alt="Furks Kahve kavurucusu kavurma makinesinde taze kahve çekirdeklerini kontrol ediyor"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-[62%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/10 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-espresso/80 px-5 py-4 text-cream shadow-xl backdrop-blur sm:bottom-8 sm:left-8">
              <strong className="font-display text-3xl">15 m²</strong>
              <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-cream/65">
                İlk kavurma atölyemiz
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-roast">
              Nasıl başladık?
            </p>
            <p className="mt-5 font-display text-7xl font-bold italic tracking-[-0.06em] text-espresso sm:text-8xl">
              2019
            </p>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-leaf">
              Moda, İstanbul
            </p>
          </div>

          <div>
            <p className="font-display text-3xl font-bold leading-snug tracking-[-0.03em] text-espresso sm:text-5xl sm:leading-tight">
              On beş metrekarelik bir dükkânda, beş kiloluk bir kavurma
              makinesiyle başladık.
            </p>
            <p className="mt-8 max-w-3xl text-base leading-8 text-espresso/65 sm:text-lg">
              Amacımız basitti: mahallemizdeki kafeler, haftalar önce kavrulmuş
              kahve yerine taze kahve kullanabilsin. Bugün altı kişiyiz,
              makinemiz büyüdü ama kuralımız aynı: sipariş gelmeden
              kavurmuyoruz.
            </p>

            <dl className="mt-12 grid overflow-hidden rounded-[2rem] border border-espresso/10 bg-cream sm:grid-cols-3">
              <div className="border-b border-espresso/10 p-6 sm:border-b-0 sm:border-r sm:p-8">
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-espresso/45">
                  Başlangıç
                </dt>
                <dd className="mt-3 font-display text-3xl font-bold text-roast">
                  15 m²
                </dd>
              </div>
              <div className="border-b border-espresso/10 p-6 sm:border-b-0 sm:border-r sm:p-8">
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-espresso/45">
                  İlk makine
                </dt>
                <dd className="mt-3 font-display text-3xl font-bold text-roast">
                  5 kg
                </dd>
              </div>
              <div className="p-6 sm:p-8">
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-espresso/45">
                  Bugün
                </dt>
                <dd className="mt-3 font-display text-3xl font-bold text-roast">
                  6 kişi
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-espresso py-20 text-cream sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-roast-light">
                Kavurma sürecimiz
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
                Dört adımda
                <span className="block italic text-roast-light">taze kahve.</span>
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-cream/65 lg:justify-self-end">
              Çekirdeği seçtiğimiz andan paketin yola çıktığı güne kadar her
              aşamayı küçük partiler ve net bir takvimle yönetiyoruz.
            </p>
          </div>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-cream/15 bg-cream/15 md:grid-cols-2 xl:grid-cols-4">
            {roastingSteps.map((step) => (
              <li key={step.number} className="min-h-72 bg-espresso p-7 sm:p-9">
                <span className="font-display text-xl italic text-roast-light">
                  {step.number}
                </span>
                <h3 className="mt-12 font-display text-3xl font-bold">
                  {step.title}
                </h3>
                <p className="mt-4 leading-7 text-cream/65">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-roast py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
              Hikâyenin devamı fincanda
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              Bu hafta kavrulan kahveleri keşfedin.
            </h2>
          </div>
          <Link
            href="/kahvelerimiz"
            className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-espresso px-8 py-4 font-bold text-cream transition hover:-translate-y-0.5 hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Kahvelerimizi görün <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
