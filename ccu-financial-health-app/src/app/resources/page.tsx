"use client";

import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-client";

export default function ResourcesPage() {
  useLocale();

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">{t("nav.resources")}</h1>
      <a
        href="https://www.connectidaho.org/resources"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-white"
      >
        {t("products.card.learn")} →
      </a>
    </section>
  );
}
