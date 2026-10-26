"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { href: "/kahvelerimiz", label: "Kahvelerimiz" },
  { href: "/hikayemiz", label: "Hikâyemiz" },
  { href: "/toptan", label: "Toptan" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-[-0.04em] text-espresso"
          onClick={() => setIsOpen(false)}
        >
          Furks Kahve<span className="text-roast">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Ana menü">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition-colors hover:text-roast ${
                pathname === item.href ? "text-roast" : "text-espresso/75"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/toptan"
            className="rounded-full bg-roast px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-roast-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roast"
          >
            Teklif al
          </Link>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-espresso/15 text-espresso md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${
                isOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobil menü"
        className={`overflow-hidden border-t border-espresso/10 bg-cream transition-[max-height,opacity] duration-300 md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col px-5 py-5">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="border-b border-espresso/10 py-4 text-lg font-semibold text-espresso last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/toptan"
            onClick={() => setIsOpen(false)}
            className="mt-4 rounded-full bg-roast px-5 py-3.5 text-center font-bold text-white"
          >
            Toptan teklif al
          </Link>
        </div>
      </nav>
    </header>
  );
}
