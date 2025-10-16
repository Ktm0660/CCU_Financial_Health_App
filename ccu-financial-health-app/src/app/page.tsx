import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="card">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          <div>
            <h1 className="page-title">Money, made simpler.</h1>
            <p className="lead mt-3">
              Short checkup. Clear next steps. Products that fit your life.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/assess">Take the checkup</Link>
              <Link className="btn btn-ghost" href="/products">Explore products</Link>
            </div>
          </div>
          <div className="panel">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="badge badge-blue">Simple</span>
                <p className="text-brand-gray">Plain language and small steps you can use today.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="badge badge-blue">Transparent</span>
                <p className="text-brand-gray">Upfront about costs, terms, and how each product helps.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="badge badge-blue">Supportive</span>
                <p className="text-brand-gray">Certified counselors, a mobile unit, and a community-first approach.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
