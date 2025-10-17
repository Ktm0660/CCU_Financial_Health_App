import Container from "@/components/Container";

const products = [
  {name:"Starter Savings", apr:"0.50% APY", pitch:"No minimums, no monthly fees.", bullets:["$5 to open","Fee-free withdrawals at branches/ATMs","Federally insured"]},
  {name:"Cash Cushion (Small-Dollar Loan)", apr:"12.99% APR", pitch:"For short-term needs—clear terms.", bullets:["Borrow $300–$1,000","No prepayment penalty","Build credit with on-time payments"]},
  {name:"Pathway Credit Builder", apr:"Share-Secured", pitch:"Use your own savings as collateral.", bullets:["Borrow against savings","Low rate","Build payment history"]},
  {name:"Everyday Checking", apr:"No monthly fee", pitch:"Direct deposit friendly, free bill-pay.", bullets:["Free debit card","Early direct deposit (where available)","Overdraft options explained upfront"]},
];

export default function Products(){
  return (
    <Container>
      <div className="space-y-6">
        <section className="card p-6 sm:p-8">
          <h1 className="text-3xl font-semibold text-[color:#0D3554]">Products &amp; terms</h1>
          <p className="mt-3 text-slate-600 max-w-prose">Clear costs. No surprises. We’ll help you choose what fits your situation.</p>
        </section>

        <div>
          {products.map((p)=>(
            <article key={p.name} className="card p-6 sm:p-8 mb-5 last:mb-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-xl font-semibold text-[color:#0D3554]">{p.name}</h2>
                <span className="px-3 py-1 rounded-full bg-[rgb(14,125,182,0.08)] text-[color:#0D3554] text-sm font-medium">{p.apr}</span>
              </div>
              <p className="mt-3 text-slate-600">{p.pitch}</p>
              <ul className="mt-4 list-disc pl-5 text-slate-600 space-y-2">
                {p.bullets.map(b=><li key={b}>{b}</li>)}
              </ul>
              <button className="mt-5 gradient-btn inline-flex min-h-[44px] items-center justify-center px-6 py-3 font-semibold" aria-label={`I'm interested in ${p.name}`}>
                I’m interested
              </button>
            </article>
          ))}
        </div>
      </div>
    </Container>
  )
}
