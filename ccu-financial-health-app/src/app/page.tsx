"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main>
      {/* HERO */}
      <section className="relative">
        <div className="container">
          <div className="mt-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs tracking-wider text-brand-teal font-semibold">CONNECTIONS CU</span>
              <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight text-brand-navy">
                Feel confident with your money.
              </h1>
              <p className="mt-4 text-lg text-slate-700">
                Simple steps, transparent options, and caring guidance—built for rural and underserved members.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => router.push("/assess")}
                  className="inline-flex items-center justify-center rounded-xl bg-brand-blue px-5 py-3 text-white font-medium shadow-card hover:opacity-95 focus-visible:outline-none"
                >
                  Start your 3-minute checkup
                </button>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-xl border border-brand-blue text-brand-blue px-5 py-3 font-medium bg-white hover:bg-brand-sky"
                >
                  Products & Services
                </Link>
              </div>

              <ul className="mt-6 space-y-2 text-slate-700">
                <li>• Transparent pricing</li>
                <li>• Judgment-free guidance</li>
                <li>• ITIN lending options</li>
                <li>• Mobile unit for rural areas</li>
              </ul>
            </div>

            {/* Right-side visual card */}
            <div className="lg:block">
              <div className="rounded-2xl shadow-card bg-white p-6 border border-brand-ring">
                <h3 className="text-brand-navy font-semibold text-lg">What you’ll get</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>• A simple snapshot of your current situation</li>
                  <li>• 1–3 clear next steps you can start today</li>
                  <li>• A product match only if it helps</li>
                </ul>
                <div className="mt-5 rounded-xl bg-brand-sky p-4">
                  <p className="text-sm text-slate-800">
                    “We built this to make banking feel human—so you always know what’s next.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST PILLARS */}
      <section className="mt-12">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            { title: "Simple", body: "Plain language and small steps you can use today." },
            { title: "Transparent", body: "Upfront about costs, terms, and how each product helps." },
            { title: "Supportive", body: "Certified counselors, a mobile unit, and a community-first approach." },
          ].map((c) => (
            <div key={c.title} className="bg-white rounded-2xl border border-brand-ring shadow-card p-6">
              <h3 className="text-lg font-semibold text-brand-navy">{c.title}</h3>
              <p className="mt-2 text-slate-700">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-12">
        <div className="container">
          <div className="bg-white rounded-2xl border border-brand-ring shadow-card p-6">
            <h2 className="text-2xl font-bold text-brand-navy">How it works</h2>
            <ol className="mt-4 grid md:grid-cols-3 gap-6 text-slate-700">
              <li className="bg-brand-sky rounded-xl p-4">
                <p className="font-semibold text-brand-blue">1. Quick checkup</p>
                <p className="text-sm mt-1">Answer easy, yes/no style questions. No credit pull.</p>
              </li>
              <li className="bg-brand-sky rounded-xl p-4">
                <p className="font-semibold text-brand-blue">2. Clear steps</p>
                <p className="text-sm mt-1">Get 1–3 actions that fit your situation and timeline.</p>
              </li>
              <li className="bg-brand-sky rounded-xl p-4">
                <p className="font-semibold text-brand-blue">3. Friendly help</p>
                <p className="text-sm mt-1">Talk to a counselor in-branch, by phone, or at the mobile unit.</p>
              </li>
            </ol>
            <div className="mt-6">
              <Link href="/assess" className="inline-flex rounded-xl bg-brand-teal px-5 py-3 text-white font-medium shadow-card hover:opacity-95">
                Start now — it’s free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (soft trust) */}
      <section className="mt-12">
        <div className="container grid md:grid-cols-3 gap-6">
          {[
            "They explained everything in plain English. No pressure—just help.",
            "I used the Credit Builder and my score went up. Payments were doable.",
            "The mobile branch came to our town. They treated us with real respect.",
          ].map((quote, i) => (
            <figure key={i} className="bg-white rounded-2xl border border-brand-ring shadow-card p-6">
              <blockquote className="text-slate-800">“{quote}”</blockquote>
            </figure>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mt-12 mb-16">
        <div className="container">
          <div className="rounded-2xl bg-white border border-brand-ring shadow-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-brand-navy">Ready when you are.</h3>
              <p className="text-slate-700 mt-1">No sales pitch. Just clear steps and tools that fit your life.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/assess" className="inline-flex rounded-xl bg-brand-blue px-5 py-3 text-white font-medium shadow-card hover:opacity-95">
                Take the checkup
              </Link>
              <Link href="/products" className="inline-flex rounded-xl border border-brand-blue text-brand-blue px-5 py-3 font-medium bg-white hover:bg-brand-sky">
                Explore products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
