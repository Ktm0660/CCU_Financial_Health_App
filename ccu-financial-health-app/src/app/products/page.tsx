import { SectionTitle, Card } from "@/components/ui";
import { t } from "@/lib/i18n";

const catalog = [
  {
    id: "checking",
    name: "Free Checking",
    category: "Banking",
    url: "https://www.connectidaho.org/accounts/free-checking",
    desc: "No monthly fee, debit card, online + mobile banking.",
  },
  {
    id: "savings",
    name: "Regular Savings",
    category: "Savings",
    url: "https://www.connectidaho.org/accounts/savings",
    desc: "Start small, grow steady; dividend-earning.",
  },
  {
    id: "auto",
    name: "Auto Loans",
    category: "Loans",
    url: "https://www.connectidaho.org/loans/auto",
    desc: "Competitive rates, flexible terms.",
  },
  {
    id: "credit",
    name: "Credit Cards",
    category: "Cards",
    url: "https://www.connectidaho.org/loans/credit-cards",
    desc: "Low rates and local support.",
  },
  {
    id: "personal",
    name: "Personal Loans",
    category: "Loans",
    url: "https://www.connectidaho.org/loans/personal",
    desc: "For planned and unplanned expenses.",
  },
  {
    id: "itin",
    name: "ITIN Lending",
    category: "Access",
    url: "https://www.connectidaho.org/loans/itin",
    desc: "Inclusive options for ITIN members.",
  },
];

export default function ProductsPage() {
  return (
    <section className="space-y-6">
      <SectionTitle kicker="Connections">{t("products.title")}</SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {catalog.map((p) => (
          <a key={p.id} href={p.url} target="_blank" className="group">
            <Card className="p-5">
              <div className="text-xs uppercase tracking-wide text-[var(--accent)]">{p.category}</div>
              <h2 className="mt-1 text-lg font-medium group-hover:underline">{p.name}</h2>
              <p className="mt-2 text-sm text-[var(--ink-2)]">{p.desc}</p>
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
