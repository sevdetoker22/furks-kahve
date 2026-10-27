import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/session";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main id="main-content" className="min-h-[calc(100svh-5rem)] bg-[#fffaf2] px-5 py-12 sm:py-20">
      <div className="mx-auto max-w-sm">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-roast">Furks Coffee / Yönetim</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.045em]">Yönetici girişi</h1>
        <p className="mt-4 text-sm leading-7 text-espresso/65">İşletmenize gelen toptan teklif taleplerini görüntülemek için giriş yapın.</p>
        <LoginForm />
        <Link href="/" className="mt-7 inline-block text-sm text-espresso/65 underline underline-offset-4">Siteye dön</Link>
      </div>
    </main>
  );
}
