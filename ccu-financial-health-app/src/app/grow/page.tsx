export default function GrowPage() {
  return (
    <>
      <section className="card space-y-3">
        <h1>Grow — tools from Connections CU</h1>
        <p className="text-slate-600 max-w-prose">
          Transparent options designed to beat payday costs and build stability.
        </p>
      </section>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <section className="card space-y-3">
          <h3>Small-Dollar Relief Loan</h3>
          <p className="text-slate-600">Fast decisions, clear pricing, no surprises. Replace payday debt and breathe.</p>
          <ul className="list-disc pl-5 text-slate-600 space-y-1">
            <li>Lower cost than payday/title loans</li>
            <li>Automatic payments to fit your paycheck</li>
          </ul>
        </section>

        <section className="card space-y-3">
          <h3>ITIN Lending</h3>
          <p className="text-slate-600">Safe credit access for our immigrant neighbors — build history the right way.</p>
        </section>

        <section className="card space-y-3">
          <h3>Fresh-Start Savings</h3>
          <p className="text-slate-600">Separate pocket for emergencies. Automate $10–$25; celebrate milestones.</p>
        </section>

        <section className="card space-y-4">
          <div className="space-y-2">
            <h3>Free Financial Counseling</h3>
            <p className="text-slate-600">Certified, judgment-free guidance. Create a plan that fits your life.</p>
          </div>
          <a className="btn-primary" href="#">
            Schedule a conversation
          </a>
        </section>
      </div>
    </>
  );
}
