"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { useSearchParams } from "next/navigation";

const ALL_TAGS = Array.from(new Set(PRODUCTS.flatMap((p) => p.tags))).sort();

function ProductsContent() {
  const params = useSearchParams();
  const preselect = useMemo(() => (params.get("tags") ?? "").split(",").filter(Boolean), [params]);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<string[]>(preselect);

  useEffect(() => {
    setTags(preselect);
  }, [preselect]);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const q = query.trim().toLowerCase();
      const text = [p.name, p.summary, p.whyItHelps, p.fees ?? "", p.aprRange ?? "", ...(p.eligibility ?? [])]
        .join(" ")
        .toLowerCase();
      const matchesQuery = q.length === 0 || text.includes(q);
      const matchesTags = tags.length === 0 || tags.every((t) => p.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [query, tags]);

  const toggleTag = (t: string) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  return (
    <div className="space-y-6">
      <header className="space-y-2">
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
              className={`px-3 py-1 rounded-full border text-sm ${tags.includes(t) ? "bg-brand-blue text-white border-brand-blue" : "border-brand-blue text-brand-blue hover:bg-brand-light"}`}
              onClick={() => toggleTag(t)}
            >
              {t}
            </button>
          ))}
          {tags.length > 0 && (
            <button className="px-3 py-1 rounded-full border border-slate-300 text-sm" onClick={() => setTags([])}>
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="card">
            <h2 className="text-xl font-semibold text-brand-navy">{p.name}</h2>
            <p className="mt-1 text-brand-gray">{p.summary}</p>
            <div className="mt-3 text-brand-ink">
              <div className="font-medium">Why it helps</div>
              <p className="mt-1">{p.whyItHelps}</p>
            </div>
            {p.fees && (
              <p className="mt-3 text-sm text-brand-gray">
                <strong>Fees:</strong> {p.fees}
              </p>
            )}
            {p.aprRange && (
              <p className="text-sm text-brand-gray">
                <strong>APR:</strong> {p.aprRange}
              </p>
            )}
            {p.eligibility && p.eligibility.length > 0 && (
              <p className="text-sm text-brand-gray mt-1">
                <strong>Eligibility:</strong> {p.eligibility.join(", ")}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="px-2 py-1 rounded-full bg-brand-light text-brand-blue border border-brand-blue text-xs">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-brand-gray">No products match your filters yet.</div>}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-brand-gray">Loading…</div>}>
      <ProductsContent />
    </Suspense>
  );
}
