import Link from "next/link";
export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="card">
        <h1 className="page-title">Money, made simpler.</h1>
        <p className="lead mt-3">
          Short checkup. Clear next steps. Products that fit your life.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/assess">Take the checkup</Link>
          <Link className="btn btn-outline" href="/products">Explore products</Link>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-brand-navy">Simple</h3>
          <p className="mt-2 text-brand-gray">Plain language and small steps you can use today.</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold text-brand-navy">Transparent</h3>
          <p className="mt-2 text-brand-gray">Upfront about costs, terms, and how each product helps.</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold text-brand-navy">Supportive</h3>
          <p className="mt-2 text-brand-gray">Certified counselors, a mobile unit, and a community-first approach.</p>
        </div>
      </section>
    </div>
  );
}
