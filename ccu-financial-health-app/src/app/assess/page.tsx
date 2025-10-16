"use client";

import Link from "next/link";
import React from "react";

const pillars = [
  {
    title: "Earn",
    description:
      "Stabilize and grow your income with reliable earnings, benefits, and opportunities to advance.",
    score: 12,
    max: 20,
  },
  {
    title: "Spend",
    description:
      "Balance everyday expenses by creating a spending plan that covers needs and allows room for joy.",
    score: 14,
    max: 20,
  },
  {
    title: "Save",
    description:
      "Build cushions for emergencies and future goals so you can respond confidently to what comes next.",
    score: 13,
    max: 20,
  },
  {
    title: "Borrow",
    description:
      "Use credit wisely by maintaining healthy debt levels and understanding the cost of borrowing.",
    score: 15,
    max: 20,
  },
  {
    title: "Plan",
    description:
      "Set a clear financial vision with steps that align your money decisions with your life priorities.",
    score: 14,
    max: 20,
  },
];

const totalScore = pillars.reduce((sum, pillar) => sum + pillar.score, 0);
const totalMax = pillars.reduce((sum, pillar) => sum + pillar.max, 0);

export default function AssessPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl bg-white p-8 shadow-md sm:p-10">
          <header className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
              Connections Credit Union
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Financial Health Framework
            </h1>
            <p className="mt-4 text-base text-slate-600 sm:text-lg">
              Discover where you shine and where you can grow across five pillars of
              financial well-being. Start with an overview, then dive into your
              personalized assessment when you&apos;re ready.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((pillar) => {
              const progress = Math.round((pillar.score / pillar.max) * 100);

              return (
                <article
                  key={pillar.title}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {pillar.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${progress}%` }}
                        aria-hidden
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-600">Progress</span>
                      <span className="font-semibold text-emerald-600">
                        {pillar.score}/{pillar.max}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <footer className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-slate-50 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Your Financial Health
              </h3>
              <p className="text-sm text-slate-600">
                {totalScore} out of {totalMax} (and ready to grow!)
              </p>
            </div>
            <Link
              href="/assess/start"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Start Assessment
            </Link>
          </footer>
        </section>
      </div>
    </main>
  );
}
