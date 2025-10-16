"use client";
import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { useSearchParams } from "next/navigation";

const ALL_TAGS = Array.from(new Set(PRODUCTS.flatMap(p => p.tags))).sort();

export default function ProductsPage() {
  const params = useSearchParams();
  const preselect = (params.get("tags") ?? "").split(",").filter(Boolean);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<string[]>(preselect);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const q = query.trim().toLowerCase();
      const text = [p.name, p.summary, p.whyItHelps, (p.fees ?? ""), (p.aprRange ?? ""), ...(p.eligibility ?? [])].join(" ").toLowerCase();
      const matchesQuery = q.length === 0 || text.includes(q);
      const matchesTags = tags.length === 0 || tags.every(t => p.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [query, tags]);

  const toggleTag = (t: string) => setTags((prev) => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Transparent Products</h1>
        <p className="lead">Upfront details. Clear benefits. Pick what fits your next step.</p>
      </header>

      <div className="card space-y-4">
        <input
          aria-label="Search products"
          className="input"
          placeholder="Search by name, need, or details…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((t) => (
            <button
              key={t}
              className={`badge ${tags.includes(t) ? "badge-blue" : "border-brand-border text-brand-navy"}`}
              onClick={() => toggleTag(t)}
            >
              {t}
            </button>
          ))}
          {tags.length > 0 && (
            <button className="badge border-brand-border text-brand-gray" onClick={() => setTags([])}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <article key={p.id} className="card hover:shadow-lift transition-shadow">
            <h2 className="text-xl font-semibold text-brand-navy">{p.name}</h2>
            <p className="mt-1 text-brand-gray">{p.summary}</p>

            <div className="mt-3">
              <div className="font-medium">Why it helps</div>
              <p className="mt-1">{p.whyItHelps}</p>
            </div>

            <dl className="mt-3 grid gap-2 text-sm text-brand-gray">
              {p.fees && (<div><dt className="font-medium inline">Fees:</dt> <dd className="inline">{p.fees}</dd></div>)}
              {p.aprRange && (<div><dt className="font-medium inline">APR:</dt> <dd className="inline">{p.aprRange}</dd></div>)}
              {p.eligibility && p.eligibility.length > 0 && (
                <div><dt className="font-medium inline">Eligibility:</dt> <dd className="inline">{p.eligibility.join(", ")}</dd></div>
              )}
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="badge border-brand-border text-brand-gray">{t}</span>
              ))}
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="text-brand-gray">No products match your filters yet.</div>
        )}
      </div>
    </div>
  );
}
