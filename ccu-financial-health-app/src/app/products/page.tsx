export default function Products(){
  const products = [
    {name:"Starter Savings", apr:"0.50% APY", pitch:"No minimums, no monthly fees.", bullets:["$5 to open","Fee-free withdrawals at branches/ATMs","Federally insured"]},
    {name:"Cash Cushion (Small-Dollar Loan)", apr:"12.99% APR", pitch:"For short-term needs—clear terms.", bullets:["Borrow $300–$1,000","No prepayment penalty","Build credit with on-time payments"]},
    {name:"Pathway Credit Builder", apr:"Share-Secured", pitch:"Use your own savings as collateral.", bullets:["Borrow against savings","Low rate","Build payment history"]},
    {name:"Everyday Checking", apr:"No monthly fee", pitch:"Direct deposit friendly, free bill-pay.", bullets:["Free debit card","Early direct deposit (where available)","Overdraft options explained upfront"]},
  ];

  return (
    <div className="stack-lg">
      <section className="card card-pad shadow-hover">
        <h1 className="h1">Products &amp; terms</h1>
        <p className="lead">Clear costs. No surprises. We’ll help you choose what fits your situation.</p>
      </section>

      <div className="grid-3">
        {products.map((p)=>(
          <article key={p.name} className="card card-pad shadow-hover">
            <div className="stack">
              <div className="kv">
                <h2 className="h2" style={{margin:0}}>{p.name}</h2>
                <span style={{fontWeight:900,color:'var(--brand-navy)'}}>{p.apr}</span>
              </div>
              <p className="muted">{p.pitch}</p>
              <ul style={{paddingLeft:'1.2rem',color:'var(--brand-ink)',lineHeight:'1.65'}}>
                {p.bullets.map(b=><li key={b}>{b}</li>)}
              </ul>
              <button className="btn btn-primary" aria-label={`I'm interested in ${p.name}`}>I’m interested</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
