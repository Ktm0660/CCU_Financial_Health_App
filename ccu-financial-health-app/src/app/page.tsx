import Link from "next/link";
import Card from "@/components/Card";

export default function Home(){
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-[var(--line)] bg-white p-8 md:p-10 shadow-sm">
        <p className="mb-3 text-xs font-semibold tracking-widest text-[var(--ink-2)]">CONNECTIONS CU</p>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--ink)]">Feel confident with your money.</h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--ink-2)]">Simple steps, transparent options, and caring guidance—built for rural and underserved members.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/assess" className="rounded-full bg-[var(--accent)] px-5 py-3 text-white font-semibold hover:bg-[var(--accent-700)]">
            Start your 3-minute checkup
          </Link>
          <Link href="/products" className="rounded-full border border-[var(--line)] px-5 py-3 font-semibold text-[var(--ink)] hover:bg-[var(--bg)]">
            Products & Services
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-[var(--ink)]">Simple</h3>
          <p className="mt-2 text-[var(--ink-2)]">Plain language and small steps you can use today.</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-[var(--ink)]">Transparent</h3>
          <p className="mt-2 text-[var(--ink-2)]">Upfront about costs, terms, and how each product helps.</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-[var(--ink)]">Supportive</h3>
          <p className="mt-2 text-[var(--ink-2)]">Certified counselors, a mobile unit, and a community-first approach.</p>
        </Card>
      </section>
    </div>
  );
}
