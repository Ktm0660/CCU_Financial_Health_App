"use client";

import { setLocale, t } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-client";
import { Button } from "@/components/ui";

export default function LanguageToggle() {
  const lang = useLocale();
  return (
    <Button
      type="button"
      variant="outline"
      className="px-3 py-1.5 text-xs uppercase tracking-wide"
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
    </Button>
  );
}
