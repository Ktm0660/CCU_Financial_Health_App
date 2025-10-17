"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageProvider";

const NAV_LINKS = [
  { href: "/", label_en: "Home", label_es: "Inicio" },
  { href: "/assess", label_en: "Assessment", label_es: "Evaluación" },
  { href: "/products", label_en: "Products", label_es: "Productos" },
  { href: "/resources", label_en: "Resources", label_es: "Recursos" },
];

export default function NavBar() {
  const pathname = usePathname();
  const { language, toggle } = useLanguage();
  const isSpanish = language === "es";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold tracking-wide text-[var(--ink)]">
          Connections CU · <span className="text-[var(--accent)]">Financial Wellness</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-sm font-semibold text-[var(--accent)]"
                    : "text-sm text-[var(--ink-2)] transition hover:text-[var(--accent)]"
                }
              >
                {isSpanish ? item.label_es : item.label_en}
              </Link>
            );
          })}
          <button
            onClick={toggle}
            aria-label="Toggle Spanish"
            className="rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink-2)] transition hover:bg-[var(--bg)]"
          >
            {isSpanish ? "ESPAÑOL ✓" : "ESPAÑOL"}
          </button>
        </nav>
        <button
          onClick={toggle}
          className="rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink-2)] md:hidden"
        >
          {isSpanish ? "ES ✓" : "ES"}
        </button>
      </div>
    </header>
  );
}
