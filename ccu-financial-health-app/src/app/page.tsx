import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="card p-6 bg-gradient-to-br from-brand-sand to-white">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">Financial Wellness Made Simple</h1>
        <p className="mt-2 text-brand-stone max-w-prose">
          Friendly guidance built for Idaho—clear steps, no judgment, and tools that fit your life.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/assess" className="btn-primary">Start Your Checkup</Link>
          <Link href="/learn" className="underline text-brand-blue">Browse Education</Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          { title: 'Lower Costs', desc: 'Fair rates and no hidden fees.' },
          { title: 'Simple Guidance', desc: 'Plain language and step-by-step help.' },
          { title: 'Real Service', desc: 'Certified counselors and a mobile unit that comes to you.' },
        ].map(c => (
          <div key={c.title} className="card p-6">
            <div className="badge">{c.title}</div>
            <p className="mt-3 text-brand-ink">{c.desc}</p>
          </div>
        ))}
      </section>

      <section className="card p-6 text-center">
        <h2 className="text-xl font-semibold text-brand-navy">Ready to take your first step?</h2>
        <p className="mt-2 text-brand-stone">Take our short assessment and see your best next move.</p>
        <Link href="/assess" className="btn-primary mt-4 inline-block">Start Now</Link>
      </section>
    </div>
  )
}
