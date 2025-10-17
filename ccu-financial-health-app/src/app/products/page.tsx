import Card from "@/components/Card";

const PRODUCTS = [
  {
    name: "Free Checking",
    blurb: "No monthly fee. Direct deposit friendly.",
    link: "https://www.connectidaho.org/",
  },
  {
    name: "Savings (Share) Account",
    blurb: "Start small, grow steady, NCUA insured.",
    link: "https://www.connectidaho.org/",
  },
  {
    name: "ITIN Lending",
    blurb: "Fair auto and personal loans with ITIN accepted.",
    link: "https://www.connectidaho.org/",
  },
  {
    name: "Credit Builder Loan",
    blurb: "Build credit while you save.",
    link: "https://www.connectidaho.org/",
  },
  {
    name: "Secured Credit Card",
    blurb: "Improve credit with a secured line.",
    link: "https://www.connectidaho.org/",
  },
  {
    name: "Small-Dollar Emergency Loan",
    blurb: "Lower-cost alternative to payday loans.",
    link: "https://www.connectidaho.org/",
  },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold text-[var(--ink)]">Products &amp; Services</h1>
      <p className="text-[var(--ink-2)]">Transparent terms, judgment-free guidance.</p>
      <div className="grid gap-6 md:grid-cols-2">
        {PRODUCTS.map((product) => (
          <Card key={product.name} className="p-6">
            <h3 className="text-lg font-semibold text-[var(--ink)]">{product.name}</h3>
            <p className="mt-1 text-[var(--ink-2)]">{product.blurb}</p>
            <a
              href={product.link}
              className="mt-3 inline-block rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--bg)]"
            >
              Learn more
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
