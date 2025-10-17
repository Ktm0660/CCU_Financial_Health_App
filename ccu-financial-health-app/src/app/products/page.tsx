"use client";

import { catalog } from "@/lib/catalog";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-client";

export default function ProductsPage() {
  useLocale();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">{t("products.title")}</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="text-xs uppercase tracking-wide text-[#2E6D8A]">{p.category}</div>
            <h2 className="mt-1 text-lg font-medium group-hover:underline">{p.name}</h2>
            <p className="mt-2 text-sm text-[#335E7E]">{p.shortDescription}</p>
            <div className="mt-3 text-sm font-medium text-[#0B2E4E]">{t("products.card.learn")} →</div>
          </a>
        ))}
      </div>
    </section>
  );
}
