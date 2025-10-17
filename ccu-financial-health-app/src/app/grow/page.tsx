import Container from "@/components/Container";

export default function GrowPage() {
  return (
    <Container>
      <div className="space-y-6">
        <section className="card p-6 sm:p-8">
          <h1 className="text-3xl font-semibold text-[color:#0D3554]">Grow — tools from Connections CU</h1>
          <p className="mt-3 text-slate-600 max-w-prose">
            Transparent options designed to beat payday costs and build stability.
          </p>
        </section>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          <article className="card p-6 sm:p-7 space-y-3">
            <h3 className="text-lg font-semibold text-[color:#0D3554]">Small-Dollar Relief Loan</h3>
            <p className="text-slate-600">Fast decisions, clear pricing, no surprises. Replace payday debt and breathe.</p>
            <ul className="list-disc pl-5 text-slate-600 space-y-1">
              <li>Lower cost than payday/title loans</li>
              <li>Automatic payments to fit your paycheck</li>
            </ul>
          </article>

          <article className="card p-6 sm:p-7 space-y-3">
            <h3 className="text-lg font-semibold text-[color:#0D3554]">ITIN Lending</h3>
            <p className="text-slate-600">Safe credit access for our immigrant neighbors — build history the right way.</p>
          </article>

          <article className="card p-6 sm:p-7 space-y-3">
            <h3 className="text-lg font-semibold text-[color:#0D3554]">Fresh-Start Savings</h3>
            <p className="text-slate-600">Separate pocket for emergencies. Automate $10–$25; celebrate milestones.</p>
          </article>

          <article className="card p-6 sm:p-7 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[color:#0D3554]">Free Financial Counseling</h3>
              <p className="mt-2 text-slate-600">Certified, judgment-free guidance. Create a plan that fits your life.</p>
            </div>
            <a className="gradient-btn inline-flex min-h-[44px] items-center justify-center px-6 py-3 font-semibold" href="#">
              Schedule a conversation
            </a>
          </article>
        </div>
      </div>
    </Container>
  );
}
