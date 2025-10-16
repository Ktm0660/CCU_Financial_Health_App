import Link from "next/link";
import { resources } from "@/lib/resources";

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link href="/" className="text-sm underline">
        &larr; Home
      </Link>
      <h1 className="mt-4 text-3xl font-bold">Resources</h1>
      <p className="mt-2 text-neutral-700">
        Clear help. No judgment. Pick what you need now.
      </p>
      <div className="mt-6 space-y-6">
        {resources.map((r) => (
          <section id={r.id} key={r.id} className="rounded-lg border p-4">
            <div className="text-xs uppercase tracking-wide text-neutral-500">{r.tag}</div>
            <h2 className="mt-1 text-xl font-semibold">{r.title}</h2>
            <p className="mt-1 text-neutral-700">{r.summary}</p>
            <div className="mt-3">
              <a href={r.href} className="text-sm underline">
                Learn more
              </a>
            </div>
          </section>
        ))}
        <section id="fee-transparency" className="rounded-lg border p-4">
          <div className="text-xs uppercase tracking-wide text-neutral-500">Transparency</div>
          <h2 className="mt-1 text-xl font-semibold">Transparent Fees</h2>
          <p className="mt-1 text-neutral-700">
            We show costs up front. Ask us to break it down in simple steps.
          </p>
        </section>
      </div>
    </main>
  );
}
