import Link from "next/link";
import { AdminNavigation } from "@/components/admin/admin-navigation";
import { requireAdmin } from "@/lib/admin/session";
import { getAdminRequests, requestsPerPage } from "@/lib/admin/requests";
import { logoutAdmin, refreshAdminRequests } from "./actions";

const monthlyNeeds: Record<string, string> = {
  under_5: "5 kg’dan az / ay",
  between_5_20: "5–20 kg / ay",
  between_20_50: "20–50 kg / ay",
  over_50: "50 kg’dan fazla / ay",
};

const dateFormat = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Istanbul",
});

const buttonClass = "inline-flex min-h-11 items-center justify-center rounded-sm border border-espresso/20 px-4 py-2 text-sm font-semibold transition-colors hover:border-leaf hover:text-leaf focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-roast";

export default async function AdminPage({ searchParams }: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { name } = await requireAdmin();
  const params = await searchParams;
  const parsedPage = typeof params.page === "string" && /^\d{1,5}$/.test(params.page)
    ? Number(params.page) : 1;
  const page = Math.max(1, parsedPage);
  const { requests, total, failed } = await getAdminRequests(page);
  const pages = Math.max(1, Math.ceil(total / requestsPerPage));

  return (
    <main id="main-content" className="min-h-[calc(100svh-5rem)] bg-[#fffaf2]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-wrap items-start justify-between gap-5 border-b border-espresso/15 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-roast">Furks Coffee / Yönetim</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-[-0.045em]">Toptan talepler</h1>
            <p className="mt-3 text-sm leading-6 text-espresso/65">Merhaba {name}. İşletmenize gelen teklif talepleri burada.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <form action={refreshAdminRequests}><button className={buttonClass}>Listeyi yenile</button></form>
            <form action={logoutAdmin}><button className={buttonClass}>Çıkış yap</button></form>
          </div>
        </div>

        <AdminNavigation active="requests" />

        {failed ? (
          <div role="alert" className="my-8 border-l-2 border-roast pl-4 text-sm leading-7 text-roast-dark">
            Talepler şu anda yüklenemedi. Lütfen listeyi yenileyerek tekrar deneyin.
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-espresso/65">
              <p><strong className="text-espresso">{total}</strong> teklif talebi</p>
              <p>En yeni talepler önce gösterilir.</p>
            </div>
            {requests.length === 0 ? (
              <div className="border-y border-espresso/15 py-14 text-center">
                <h2 className="font-display text-2xl font-bold">{total === 0 ? "Henüz talep gelmedi." : "Bu sayfada talep bulunmuyor."}</h2>
                <p className="mt-3 text-sm leading-7 text-espresso/65">{total === 0 ? "Toptan formu gönderildiğinde yeni talepleri burada görebileceksiniz." : "Talepleri görmek için ilk sayfaya dönün."}</p>
                {total > 0 ? <Link href="/admin" className="mt-5 inline-block text-sm font-semibold text-leaf underline underline-offset-4">İlk sayfaya dön</Link> : null}
              </div>
            ) : (
              <ul className="space-y-5">
                {requests.map((request) => (
                  <li key={request.id} className="min-w-0 rounded-sm border border-espresso/15 bg-white/50 p-5 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="break-words font-display text-2xl font-bold tracking-[-0.025em]">{request.business_name}</h2>
                        <p className="mt-2 text-sm text-espresso/65">{request.business_type} · {monthlyNeeds[request.monthly_coffee_need ?? ""] ?? "Aylık ihtiyaç belirtilmemiş"}</p>
                      </div>
                      <time dateTime={request.created_at} className="text-xs leading-6 text-espresso/60">{dateFormat.format(new Date(request.created_at))}</time>
                    </div>
                    <dl className="mt-5 grid gap-4 border-t border-espresso/10 pt-5 text-sm sm:grid-cols-3">
                      <div className="min-w-0"><dt className="text-xs text-espresso/55">İletişim kişisi</dt><dd className="mt-1 break-words font-semibold">{request.contact_name}</dd></div>
                      <div className="min-w-0"><dt className="text-xs text-espresso/55">E-posta</dt><dd className="mt-1 break-all"><a className="underline decoration-espresso/25 underline-offset-4 hover:text-roast" href={`mailto:${encodeURIComponent(request.email)}`}>{request.email}</a></dd></div>
                      <div className="min-w-0"><dt className="text-xs text-espresso/55">Telefon</dt><dd className="mt-1"><a className="underline decoration-espresso/25 underline-offset-4 hover:text-roast" href={`tel:${request.phone.replace(/[^\d+]/g, "")}`}>{request.phone}</a></dd></div>
                    </dl>
                    {request.message ? (
                      <details className="mt-5 border-t border-espresso/10 pt-4 text-sm">
                        <summary className="cursor-pointer font-semibold text-leaf focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-roast">Talep mesajını görüntüle</summary>
                        <p className="mt-3 whitespace-pre-wrap break-words leading-7 text-espresso/75">{request.message}</p>
                      </details>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
            {pages > 1 && requests.length > 0 ? (
              <nav aria-label="Talep sayfaları" className="mt-7 flex flex-wrap items-center justify-between gap-4 text-sm">
                <div>{page > 1 ? <Link href={`/admin?page=${page - 1}`} prefetch={false} className={buttonClass}>Önceki</Link> : null}</div>
                <span className="text-espresso/65">Sayfa {page} / {pages}</span>
                <div>{page < pages ? <Link href={`/admin?page=${page + 1}`} prefetch={false} className={buttonClass}>Sonraki</Link> : null}</div>
              </nav>
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}
