"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n-client";
import { t } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";

export default function HeaderNav() {
  useLocale();
  return (
    <nav className="flex items-center gap-6 text-sm">
      <Link className="hover:underline" href="/">{t("nav.home")}</Link>
      <Link className="hover:underline" href="/assess">{t("nav.assess")}</Link>
      <Link className="hover:underline" href="/products">{t("nav.products")}</Link>
      <Link className="hover:underline" href="/resources">{t("nav.resources")}</Link>
      <LanguageToggle />
    </nav>
  );
}
