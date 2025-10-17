import Link from "next/link";

const pillars = [
  {
    title: "Simple",
    description: "Plain language and small steps you can use today.",
  },
  {
    title: "Transparent",
    description: "Upfront about costs, terms, and how each product helps.",
  },
  {
    title: "Supportive",
    description: "Certified counselors, a mobile unit, and a community-first approach.",
  },
  {
    title: "Get started",
    description: "Answer a few questions and see small, doable next steps.",
  },
];

export default function Home() {
  return (
    <>
      <section className="card space-y-6">
        <div className="space-y-4">
          <span className="pill">Financial Wellness</span>
          <h1>Money, made simpler.</h1>
          <p className="text-lg text-slate-600 max-w-prose">
            Short checkup. Clear next steps. Transparent products that fit your life.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/assess" className="btn-primary">
            Take the 2-minute checkup
          </Link>
          <Link href="/products" className="btn-ghost">
            Explore products
          </Link>
        </div>
      </section>

      <section className="card space-y-4">
        <h2 className="text-center sm:text-left">How we help</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="space-y-2">
              <h3>{pillar.title}</h3>
              <p className="text-slate-600 text-sm sm:text-base">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
