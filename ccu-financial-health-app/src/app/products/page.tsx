const products = [
  {name:"Starter Savings", apr:"0.50% APY", pitch:"No minimums, no monthly fees.", bullets:["$5 to open","Fee-free withdrawals at branches/ATMs","Federally insured"]},
  {name:"Cash Cushion (Small-Dollar Loan)", apr:"12.99% APR", pitch:"For short-term needs—clear terms.", bullets:["Borrow $300–$1,000","No prepayment penalty","Build credit with on-time payments"]},
  {name:"Pathway Credit Builder", apr:"Share-Secured", pitch:"Use your own savings as collateral.", bullets:["Borrow against savings","Low rate","Build payment history"]},
  {name:"Everyday Checking", apr:"No monthly fee", pitch:"Direct deposit friendly, free bill-pay.", bullets:["Free debit card","Early direct deposit (where available)","Overdraft options explained upfront"]},
];

export default function Products(){
  return (
    <>
      <section className="card space-y-3">
        <h1>Products &amp; terms</h1>
        <p className="text-slate-600 max-w-prose">Clear costs. No surprises. We’ll help you choose what fits your situation.</p>
      </section>

      {products.map((p)=>(
        <section key={p.name} className="card space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2>{p.name}</h2>
            <span className="pill">{p.apr}</span>
          </div>
          <p className="text-slate-600">{p.pitch}</p>
          <ul className="list-disc pl-5 text-slate-600 space-y-2">
            {p.bullets.map(b=><li key={b}>{b}</li>)}
          </ul>
          <button className="btn-primary" aria-label={`I'm interested in ${p.name}`}>
            I’m interested
          </button>
        </section>
      ))}
    </>
  )
}
