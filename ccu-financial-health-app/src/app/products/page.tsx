import { catalog } from "@/lib/catalog";
import { SectionTitle, Card } from "@/components/ui";
import { t } from "@/lib/i18n";

export default function ProductsPage(){
  return (
    <section className="space-y-6">
      <SectionTitle kicker="Connections">{t("products.title")}</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map(p=>(
          <a key={p.id} href={p.url} target="_blank" className="group">
            <Card className="p-5">
              <div className="text-xs uppercase tracking-wide text-[var(--accent)]">{p.category}</div>
              <h2 className="mt-1 text-lg font-medium group-hover:underline">{p.name}</h2>
              <p className="mt-2 text-sm text-[var(--ink-2)]">{p.shortDescription}</p>
              <div className="mt-4 inline-flex items-center text-sm font-medium text-[var(--accent)] group-hover:opacity-80">
                {t("products.card.learn")} →
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
