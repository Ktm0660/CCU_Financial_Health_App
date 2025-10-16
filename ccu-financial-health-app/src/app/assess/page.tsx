"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { QUESTIONS, Choice, computeScore, scoreBand, improvementTags, nextSteps } from "@/lib/assessment";

const ChoicePill = ({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-lg border text-sm font-medium transition
      ${active ? "bg-brand-blue text-white border-brand-blue" : "bg-white text-brand-navy border-brand-border hover:bg-brand-soft"}`}
    aria-pressed={active}
  >
    {label}
  </button>
);

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
      <section className="card">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="page-title">Financial Wellness Checkup</h1>
            <p className="text-brand-gray mt-2">No wrong answers. Pick the best fit today.</p>
            <div className="mt-3 w-full bg-white rounded-full h-2 overflow-hidden border border-brand-border">
              <div className="bg-brand-blue h-2 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-1 text-2xs text-brand-gray">{answered}/{QUESTIONS.length} answered</div>
          </div>
          <div className="panel min-w-[220px]">
            <div className="text-2xs uppercase tracking-wide text-brand-gray">Your score</div>
            <div className="flex items-end gap-3 mt-1">
              <div className="text-4xl font-bold text-brand-navy">{score}</div>
              <div className={`text-sm font-semibold ${color}`}>{band}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="card space-y-6">
        <div className="grid sm:grid-cols-2 gap-5">
          {QUESTIONS.map((q, i) => (
            <div key={q.id} className="p-4 border border-brand-border rounded-xl">
              <p className="font-medium text-brand-navy">{i + 1}. {q.text}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <ChoicePill
                  label="Yes"
                  active={answers[q.id] === "yes"}
                  onClick={() => setAnswers((p) => ({ ...p, [q.id]: "yes" }))}
                />
                <ChoicePill
                  label="Sometimes"
                  active={answers[q.id] === "sometimes"}
                  onClick={() => setAnswers((p) => ({ ...p, [q.id]: "sometimes" }))}
                />
                <ChoicePill
                  label="No"
                  active={answers[q.id] === "no"}
                  onClick={() => setAnswers((p) => ({ ...p, [q.id]: "no" }))}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h2 className="section-title">Next steps for this month</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-brand-ink">
            {tips.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
        <div className="card">
          <h2 className="section-title">Helpful products</h2>
          <p className="text-brand-gray mt-1">See options matched to your answers.</p>
          <Link className="btn btn-primary w-full mt-4" href={{ pathname: "/products", query: { tags: tags.join(",") } }}>
            View recommendations
          </Link>
        </div>
      </section>
    </div>
  );
}
