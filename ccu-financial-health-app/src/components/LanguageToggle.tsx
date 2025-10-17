"use client";

import { setLocale, t } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-client";

export default function LanguageToggle() {
  const lang = useLocale();
  return (
    <button
      className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium transition hover:opacity-90"
      onClick={() => {
        const next = lang === "en" ? "es" : "en";
        setLocale(next);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("i18n:changed"));
        }
      }}
      aria-label="Toggle language"
    >
      {t("nav.language")}
    </button>
  );
}
