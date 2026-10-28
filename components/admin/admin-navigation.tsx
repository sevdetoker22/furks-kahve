import Link from "next/link";

export function AdminNavigation({ active }: { active: "requests" | "products" }) {
  return (
    <nav aria-label="Yönetim bölümleri" className="mb-7 flex gap-6 overflow-x-auto border-b border-espresso/15">
      {[
        { key: "requests", href: "/admin", label: "Toptan talepler" },
        { key: "products", href: "/admin/kahveler", label: "Kahveler" },
      ].map((item) => (
        <Link key={item.key} href={item.href} prefetch={false}
          aria-current={active === item.key ? "page" : undefined}
          className={`whitespace-nowrap border-b-2 py-4 text-sm font-semibold outline-offset-4 focus-visible:outline-roast ${active === item.key ? "border-roast text-espresso" : "border-transparent text-espresso/55 hover:text-roast"}`}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
