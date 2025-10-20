import Hero from "@/components/Hero";

const valueProps = [
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
    <div className="section-gap">
      <section className="hero">
        <Hero />
      </section>
      <section>
        <div className="grid-cards sm:grid-cols-2">
          {valueProps.map((prop) => (
            <section key={prop.title} className="card p-6 sm:p-8 space-y-3">
              <h3 className="text-lg font-semibold text-sky-900">{prop.title}</h3>
              <p className="text-slate-600">{prop.description}</p>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
