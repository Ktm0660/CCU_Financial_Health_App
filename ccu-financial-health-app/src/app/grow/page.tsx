import Container from "@/components/Container";

export default function GrowPage() {
  return (
    <Container className="space-y-6">
      <section className="card card-pad sm:p-6 space-y-3">
        <h1 className="section-title sm:text-4xl">Grow — tools from Connections CU</h1>
        <p className="section-sub max-w-prose text-base">
          Transparent options designed to beat payday costs and build stability.
        </p>
      </section>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <article className="card card-pad sm:p-6 space-y-3">
          <h3 className="text-lg font-semibold text-brand-navy">Small-Dollar Relief Loan</h3>
          <p className="text-base text-brand-navy/75">Fast decisions, clear pricing, no surprises. Replace payday debt and breathe.</p>
          <ul className="list-dot">
            <li>Lower cost than payday/title loans</li>
            <li>Automatic payments to fit your paycheck</li>
          </ul>
        </article>

        <article className="card card-pad sm:p-6 space-y-3">
          <h3 className="text-lg font-semibold text-brand-navy">ITIN Lending</h3>
          <p className="text-base text-brand-navy/75">Safe credit access for our immigrant neighbors — build history the right way.</p>
        </article>

        <article className="card card-pad sm:p-6 space-y-3">
          <h3 className="text-lg font-semibold text-brand-navy">Fresh-Start Savings</h3>
          <p className="text-base text-brand-navy/75">Separate pocket for emergencies. Automate $10–$25; celebrate milestones.</p>
        </article>

        <article className="card card-pad sm:p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-brand-navy">Free Financial Counseling</h3>
            <p className="text-base text-brand-navy/75">Certified, judgment-free guidance. Create a plan that fits your life.</p>
          </div>
          <a className="btn-primary w-full sm:w-auto" href="#">
            Schedule a conversation
          </a>
        </article>
      </div>
    </Container>
  );
}
