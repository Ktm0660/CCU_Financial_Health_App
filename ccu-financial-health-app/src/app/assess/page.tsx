"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { resources } from "@/lib/resources";

type Answer = 0 | 1 | 2; // 0 = No, 1 = Sometimes, 2 = Yes

type Q = {
  id: string;
  prompt: string;
  note?: string;
};

type Outcome = "Stable" | "Strained" | "In Crisis";

const QUESTIONS: Q[] = [
  {
    id: "cover-bills",
    prompt: "Can you usually cover your monthly bills?",
    note: "Rent, power, phone, food.",
  },
  {
    id: "unexpected-200",
    prompt: "If $200 came up today, could you handle it?",
    note: "A car tire, a medical copay.",
  },
  {
    id: "safe-banking",
    prompt: "Do you have a safe place to keep money?",
    note: "Checking or savings that you trust.",
  },
  {
    id: "debt-stress",
    prompt: "Does debt feel under control?",
    note: "Credit cards, loans, buy-now-pay-later.",
  },
  {
    id: "trusted-help",
    prompt: "Do you have someone you trust for money questions?",
    note: "A counselor, coach, or guide.",
  },
];

const OPTIONS: { label: string; value: Answer }[] = [
  { label: "Yes", value: 2 },
  { label: "Sometimes", value: 1 },
  { label: "No", value: 0 },
];

function outcomeFromScore(total: number): Outcome {
  if (total >= 8) return "Stable";
  if (total >= 4) return "Strained";
  return "In Crisis";
}

function recommendations(outcome: Outcome) {
  if (outcome === "Stable") {
    return [
      "Set up auto-save, even a few dollars.",
      "Check your credit and plan one goal.",
      "Meet a counselor to map your next step.",
    ];
  }
  if (outcome === "Strained") {
    return [
      "Talk with a counselor. Make a simple plan.",
      "Use auto-pay to avoid late fees.",
      "Look at our small-dollar relief loan for short gaps.",
    ];
  }
  return [
    "You are not alone. Start with a short talk with a counselor.",
    "Avoid payday rollovers. Ask about our relief loan.",
    "Open a no-minimum savings and add $5 when you can.",
  ];
}

export default function AssessPage() {
  const [answers, setAnswers] = useState<Record<string, Answer | null>>(
    Object.fromEntries(QUESTIONS.map((q) => [q.id, null]))
  );
  const [done, setDone] = useState(false);

  const total = useMemo(
    () => Object.values(answers).reduce<number>((acc, v) => acc + (v ?? 0), 0),
    [answers]
  );

  const completed = useMemo(
    () => Object.values(answers).every((v) => v !== null),
    [answers]
  );

  const outcome = useMemo(() => outcomeFromScore(total), [total]);

  const suggested = useMemo(() => {
    const base = recommendations(outcome);
    const picks =
      outcome === "Stable"
        ? ["starter-savings", "itin-credit", "counseling"]
        : outcome === "Strained"
        ? ["relief-loan", "counseling", "fee-transparency"]
        : ["relief-loan", "counseling", "starter-savings"];
    const res = resources.filter((r) => picks.includes(r.id));
    return { base, res };
  }, [outcome]);

  function select(id: string, value: Answer) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <Link href="/" className="text-sm underline">
        &larr; Home
      </Link>
      <h1 className="mt-4 text-3xl font-bold">Stability Check</h1>
      <p className="mt-2 text-neutral-700">
        5 quick questions. Plain language. No judgment.
      </p>

      {!done && (
        <div className="mt-6 space-y-6">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="rounded-lg border p-4">
              <p className="text-lg">{q.prompt}</p>
              {q.note && (
                <p className="mt-1 text-sm text-neutral-600">{q.note}</p>
              )}
              <div className="mt-3 flex gap-2">
                {OPTIONS.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => select(q.id, o.value)}
                    className={`rounded-md border px-3 py-2 text-sm ${
                      answers[q.id] === o.value
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                    aria-pressed={answers[q.id] === o.value}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            className="mt-2 w-full rounded-md bg-black px-4 py-3 text-white disabled:opacity-50"
            disabled={!completed}
            onClick={() => setDone(true)}
          >
            See my result
          </button>
        </div>
      )}

      {done && (
        <div className="mt-6 space-y-6">
          <section className="rounded-lg border p-4">
            <p className="text-sm text-neutral-600">Your result</p>
            <h2 className="mt-1 text-2xl font-semibold">{outcome}</h2>
            <p className="mt-2">
              This is a starting point. It’s not a label. We can move forward together.
            </p>
          </section>

          <section className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">Next best steps</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {suggested.base.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">Helpful resources</h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {suggested.res.map((r) => (
                <a
                  key={r.id}
                  href={r.href}
                  className="rounded-md border p-3 hover:bg-neutral-50"
                >
                  <div className="text-xs uppercase tracking-wide text-neutral-500">
                    {r.tag}
                  </div>
                  <div className="mt-1 font-medium">{r.title}</div>
                  <p className="mt-1 text-sm text-neutral-700">{r.summary}</p>
                </a>
              ))}
            </div>
          </section>

          <div className="flex gap-2">
            <button onClick={() => setDone(false)} className="rounded-md border px-4 py-2">
              Start over
            </button>
            <Link href="/resources" className="rounded-md bg-black px-4 py-2 text-white">
              See all resources
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
