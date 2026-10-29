import type { Metadata } from "next";

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
    <main id="main-content" className="bg-cream">
      <section
        aria-labelledby="contact-heading"
        className="bg-espresso pb-20 pt-7 text-cream sm:pt-9 lg:pb-24 lg:pt-10"
      >
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-10 lg:px-10">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-roast-light">
              <span className="h-px w-8 bg-roast-light" /> İletişim
            </p>
            <h1
              id="contact-heading"
              className="mt-3 font-display text-[clamp(2.5rem,4.1vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.045em]"
            >
              Bir kahveye{" "}
              <span className="block italic text-roast-light sm:inline">bekleriz.</span>
            </h1>
          </div>
          <p className="max-w-md text-sm leading-6 text-cream/70 lg:justify-self-end">
            Kahvelerimizi yerinde keşfetmek için Moda&apos;daki kavurma
            atölyemize uğrayın.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="workshop-heading"
        className="relative -mt-12 pb-8 sm:pb-10"
      >
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-[1.35fr_0.85fr] lg:px-10">
          <div className="relative min-h-68 overflow-hidden rounded-2xl border border-espresso/10 bg-[#e6dfd0] shadow-[0_12px_36px_rgba(43,29,20,0.06)] sm:min-h-80 lg:min-h-100">
            <iframe
              title="Furks Kahve Moda konumu"
              src="https://www.openstreetmap.org/export/embed.html?bbox=29.0146%2C40.9759%2C29.0346%2C40.9879&layer=mapnik&marker=40.9819%2C29.0246"
              className="absolute inset-0 h-full w-full border-0"
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="rounded-2xl bg-leaf p-6 text-cream sm:p-7">
            <h2
              id="workshop-heading"
              className="font-display text-[1.75rem] font-bold leading-tight tracking-[-0.035em]"
            >
              Moda&apos;daki atölyemiz.
            </h2>

            <address className="mt-3 text-sm not-italic leading-6 text-cream/75">
              Caferağa Mah., Kavurma Sok. No: 12/A
              <br />
              Moda, Kadıköy · İstanbul
            </address>

            <a
              href="https://www.openstreetmap.org/?mlat=40.9819&mlon=29.0246#map=17/40.9819/29.0246"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-roast px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-roast-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            >
              Yol tarifi alın <ArrowIcon />
            </a>

            <div className="mt-5 border-t border-cream/15 pt-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream/65">
                Çalışma saatleri
              </h3>
              <dl className="mt-3 space-y-2 text-[13px] leading-5 text-cream/75">
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

        </div>
      </section>

      <section aria-labelledby="contact-options-heading" className="pb-12 sm:pb-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <h2
            id="contact-options-heading"
            className="border-t border-espresso/15 pt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-leaf"
          >
            Bize ulaşın
          </h2>

          <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {contactDetails.map((detail) => (
              <li key={detail.label} className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso/55">
                  {detail.label}
                </p>
                <a
                  href={detail.href}
                  target={detail.label === "Instagram" ? "_blank" : undefined}
                  rel={detail.label === "Instagram" ? "noreferrer" : undefined}
                  className="mt-1 block min-h-11 w-fit max-w-full break-words py-2 font-display text-lg font-bold text-espresso underline decoration-roast/35 underline-offset-4 transition-colors hover:text-roast focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-roast lg:text-xl"
                >
                  {detail.value}
                </a>
                <p className="text-xs leading-5 text-espresso/60">
                  {detail.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </main>
  );
}
