"use client";

import LanguageToggle from "@/components/LanguageToggle";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-client";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function LayoutClient({ children }: PropsWithChildren) {
  useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F9FF] to-white text-[#0B2E4E]">
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="font-semibold tracking-tight">
            {t("app.title")}
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="hover:underline">
              {t("nav.home")}
            </Link>
            <Link href="/assess" className="hover:underline">
              {t("nav.assess")}
            </Link>
            <Link href="/products" className="hover:underline">
              {t("nav.products")}
            </Link>
            <Link href="/resources" className="hover:underline">
              {t("nav.resources")}
            </Link>
            <LanguageToggle />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="mt-16 border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-[#335E7E]">
          © {new Date().getFullYear()} Connections Credit Union — {t("footer.rights")}
        </div>
      </footer>
    </div>
  );
}
