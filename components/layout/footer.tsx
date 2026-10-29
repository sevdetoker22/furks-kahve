import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <Link href="/" className="font-display text-3xl font-bold tracking-[-0.04em]">
            Furks Kahve<span className="text-roast-light">.</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-cream/65">
            Moda&apos;da küçük partiler halinde, sipariş üzerine kavrulan izlenebilir kahveler.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-roast-light">Bizi bulun</h2>
          <address className="mt-4 text-sm not-italic leading-7 text-cream/75">
            Caferağa Mah., Kavurma Sok.<br />
            No: 12/A, Moda, Kadıköy
          </address>
          <a
            href="https://www.instagram.com/furkskahve"
            className="mt-3 inline-block text-sm font-bold text-cream underline decoration-roast underline-offset-4"
          >
            @furkskahve
          </a>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-roast-light">Çalışma saatleri</h2>
          <dl className="mt-4 space-y-2 text-sm leading-6 text-cream/75">
            <div className="flex justify-between gap-4"><dt>Hafta içi</dt><dd>08:30–19:00</dd></div>
            <div className="flex justify-between gap-4"><dt>Cumartesi</dt><dd>09:00–18:00</dd></div>
            <div className="flex justify-between gap-4"><dt>Pazar</dt><dd>Kapalı</dd></div>
          </dl>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 pb-24 pt-6 text-xs text-cream/45 sm:pb-6 sm:pl-8 sm:pr-60 md:flex-row md:items-center md:justify-between lg:pl-10 lg:pr-64">
          <p>© {new Date().getFullYear()} Furks Kahve</p>
          <div className="flex flex-wrap gap-5">
            <p>Taze kavrulur, hızlı tükenir.</p>
            <Link href="/admin" prefetch={false} className="text-cream/65 underline underline-offset-4 hover:text-cream">Yönetici girişi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
