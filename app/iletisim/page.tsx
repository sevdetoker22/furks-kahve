import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "İletişim | Furks Kahve",
  description:
    "Furks Kahve'nin Moda'daki kavurma atölyesine ulaşın; adresimizi, çalışma saatlerimizi ve iletişim bilgilerimizi inceleyin.",
};

const contactDetails = [
  {
    label: "Telefon",
    value: "+90 (216) 555 19 19",
    href: "tel:+902165551919",
    description: "Kahve ve sipariş sorularınız için",
  },
  {
    label: "E-posta",
    value: "merhaba@furkskahve.com",
    href: "mailto:merhaba@furkskahve.com",
    description: "Genel sorularınız için",
  },
  {
    label: "Instagram",
    value: "@furkskahve",
    href: "https://www.instagram.com/furkskahve",
    description: "Yeni kahveler ve kavurma günleri",
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

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="overflow-hidden bg-espresso py-20 text-cream sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-10">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-roast-light">
              <span className="h-px w-8 bg-roast-light" /> İletişim
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[0.94] tracking-[-0.055em] sm:text-7xl">
              Bir kahveye
              <span className="block italic text-roast-light">bekleriz.</span>
            </h1>
          </div>
          <p className="max-w-xl text-base leading-8 text-cream/70 sm:text-lg lg:justify-self-end">
            Kahveyi yerinde koklamak, çekirdek seçmek ya da yalnızca merhaba
            demek için Moda&apos;daki kavurma atölyemize uğrayın.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <div className="flex flex-col rounded-[2rem] bg-leaf p-7 text-cream sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-roast-light">
              Atölyemiz
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              Moda&apos;da, mahallenin içinde.
            </h2>

            <address className="mt-8 not-italic leading-8 text-cream/75">
              Caferağa Mah., Kavurma Sok.
              <br />
              No: 12/A, Moda, Kadıköy
              <br />
              İstanbul
            </address>

            <a
              href="https://www.openstreetmap.org/?mlat=40.9819&mlon=29.0246#map=17/40.9819/29.0246"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-full bg-roast px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-roast-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              Yol tarifi alın <ArrowIcon />
            </a>

            <div className="mt-12 border-t border-cream/15 pt-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-roast-light">
                Çalışma saatleri
              </h3>
              <dl className="mt-5 space-y-3 text-sm text-cream/75">
                <div className="flex justify-between gap-5">
                  <dt>Hafta içi</dt>
                  <dd className="font-bold text-cream">08:30–19:00</dd>
                </div>
                <div className="flex justify-between gap-5">
                  <dt>Cumartesi</dt>
                  <dd className="font-bold text-cream">09:00–18:00</dd>
                </div>
                <div className="flex justify-between gap-5">
                  <dt>Pazar</dt>
                  <dd className="font-bold text-cream">Kapalı</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="min-h-[32rem] overflow-hidden rounded-[2rem] border border-espresso/10 bg-[#e6dfd0] shadow-[0_20px_60px_rgba(43,29,20,0.08)]">
            <iframe
              title="Furks Kahve Moda konumu"
              src="https://www.openstreetmap.org/export/embed.html?bbox=29.0146%2C40.9759%2C29.0346%2C40.9879&layer=mapnik&marker=40.9819%2C29.0246"
              className="h-full min-h-[32rem] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf2] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-roast">
              Bize ulaşın
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-[-0.045em] text-espresso sm:text-6xl">
              Size en uygun yolu seçin.
            </h2>
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-espresso/10 bg-espresso/10 md:grid-cols-3">
            {contactDetails.map((detail) => (
              <li key={detail.label} className="bg-cream p-7 sm:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-leaf">
                  {detail.label}
                </p>
                <a
                  href={detail.href}
                  target={detail.label === "Instagram" ? "_blank" : undefined}
                  rel={detail.label === "Instagram" ? "noreferrer" : undefined}
                  className="mt-5 block break-words font-display text-2xl font-bold text-espresso underline decoration-roast/35 underline-offset-8 transition hover:text-roast"
                >
                  {detail.value}
                </a>
                <p className="mt-4 text-sm leading-6 text-espresso/55">
                  {detail.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-roast py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/65">
              İşletmeniz için kahve
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              Toptan çalışmak ister misiniz?
            </h2>
          </div>
          <Link
            href="/toptan"
            className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-espresso px-8 py-4 font-bold text-cream transition hover:-translate-y-0.5 hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Toptan teklif alın <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
