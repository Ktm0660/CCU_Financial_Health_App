import Container from "@/components/Container";

const products = [
  {name:"Starter Savings", apr:"0.50% APY", pitch:"No minimums, no monthly fees.", bullets:["$5 to open","Fee-free withdrawals at branches/ATMs","Federally insured"]},
  {name:"Cash Cushion (Small-Dollar Loan)", apr:"12.99% APR", pitch:"For short-term needs—clear terms.", bullets:["Borrow $300–$1,000","No prepayment penalty","Build credit with on-time payments"]},
  {name:"Pathway Credit Builder", apr:"Share-Secured", pitch:"Use your own savings as collateral.", bullets:["Borrow against savings","Low rate","Build payment history"]},
  {name:"Everyday Checking", apr:"No monthly fee", pitch:"Direct deposit friendly, free bill-pay.", bullets:["Free debit card","Early direct deposit (where available)","Overdraft options explained upfront"]},
];

export default function Products() {
  return (
    <Container className="space-y-6">
      <section className="card card-pad sm:p-6 space-y-3">
        <h1 className="section-title sm:text-4xl">Products &amp; terms</h1>
        <p className="section-sub max-w-prose text-base">
          Clear costs. No surprises. We’ll help you choose what fits your situation.
        </p>
      </section>

      <div className="space-y-4">
        {products.map((p) => (
          <article key={p.name} className="card card-pad sm:p-6 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-xl font-semibold text-brand-navy">{p.name}</h2>
              <span className="badge bg-brand-soft text-brand-navy/80 border-brand-navy/15">{p.apr}</span>
            </div>
            <p className="text-base text-brand-navy/75">{p.pitch}</p>
            <ul className="list-dot">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <button
              className="btn-primary w-full sm:w-auto"
              aria-label={`I'm interested in ${p.name}`}
            >
              I’m interested
            </button>
          </article>
        ))}
      </div>
    </Container>
  );
}
