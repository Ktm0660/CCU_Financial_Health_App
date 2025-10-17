"use client";
import { catalog } from "@/lib/catalog";
import { SectionTitle, Card } from "@/components/ui";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-client";

export default function ProductsPage() {
  useLocale();
  return (
    <section className="space-y-6">
      <SectionTitle kicker="Connections">{t("products.title")}</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((p) => (
          <a key={p.id} href={p.url} target="_blank" className="group">
            <Card className="p-5">
              <div className="text-xs uppercase tracking-wide text-[#2E6D8A]">{p.category}</div>
              <h2 className="mt-1 text-lg font-medium text-[#0B2E4E] group-hover:underline">{p.name}</h2>
              <p className="mt-2 text-sm text-[#335E7E]">{p.shortDescription}</p>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-[#2E6D8A] group-hover:opacity-80">
                {t("products.card.learn")} →
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
