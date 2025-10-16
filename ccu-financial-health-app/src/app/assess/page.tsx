"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { QUESTIONS, Choice, computeScore, scoreBand, improvementTags, nextSteps } from "@/lib/assessment";

export default function AssessPage() {
  const [answers, setAnswers] = useState<Record<string, Choice>>({});
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / QUESTIONS.length) * 100);

  const { score, band, color, tags } = useMemo(() => {
    const score = computeScore(answers);
    const { band, color } = scoreBand(score);
    const tags = improvementTags(answers).slice(0, 8);
    return { score, band, color, tags };
  }, [answers]);

  const tips = nextSteps(tags);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="page-title">Financial Wellness Checkup</h1>
        <p className="lead">Short questions. No wrong answers. Get small, useful next steps.</p>
        <div className="mt-4 w-full bg-white rounded-full h-3 overflow-hidden border border-slate-200">
          <div className="bg-brand-blue h-3 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 text-sm text-brand-gray">{answered}/{QUESTIONS.length} answered</div>
      </header>

      <section className="card space-y-6">
        <div className="grid sm:grid-cols-2 gap-5">
          {QUESTIONS.map((q, i) => (
            <div key={q.id} className="space-y-3">
              <p className="text-base sm:text-lg font-medium text-brand-navy">{i + 1}. {q.text}</p>
              <div className="flex gap-2">
                {(["yes","sometimes","no"] as Choice[]).map((val) => {
                  const selected = answers[q.id] === val;
                  return (
                    <button
                      key={val}
                      className={`btn flex-1 ${selected ? "btn-primary" : "btn-outline"}`}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
                      aria-pressed={selected}
                    >
                      {val === "yes" ? "Yes" : val === "sometimes" ? "Sometimes" : "No"}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h2 className="section-title">Your Snapshot</h2>
          <div className="mt-4 flex items-end gap-6">
            <div className="text-5xl font-bold text-brand-navy">{score}</div>
            <div className="pb-1">
              <div className={`text-lg font-semibold ${color}`}>{band}</div>
              <div className="text-brand-gray text-sm">Score out of 100</div>
            </div>
          </div>
          <p className="mt-4 text-brand-gray">Pick one small change to try this month—momentum beats perfection.</p>
        </div>

        <div className="card">
          <h2 className="section-title">Next Steps</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-brand-ink">
            {tips.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
          <div className="mt-4">
            <Link className="btn btn-primary w-full" href={{ pathname: "/products", query: { tags: tags.join(",") } }}>
              See products that help
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
