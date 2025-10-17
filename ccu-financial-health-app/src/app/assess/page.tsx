"use client";
import { useState } from "react";
import { Card, Button, Field, SectionTitle } from "@/components/ui";
import { t } from "@/lib/i18n";

type Q = { id: string; label: string; hint?: string; type?: string };
const qs: Q[] = [
  { id: "income", label: "Monthly take-home pay ($)", hint: "Your usual deposit after taxes.", type: "number" },
  { id: "needs", label: "Monthly essential expenses ($)", hint: "Housing, food, utilities, transport.", type: "number" },
  { id: "debtPay", label: "Total monthly debt payments ($)", hint: "Loans and credit cards.", type: "number" },
  { id: "savings", label: "Emergency savings ($)", hint: "What you could use in a pinch.", type: "number" },
  { id: "util", label: "Credit card use (%)", hint: "Used balance ÷ limit × 100.", type: "number" },
  { id: "late", label: "Any late payments in last 12 months? (0=no, 1=yes)", type: "number" },
  { id: "housing", label: "Housing stable for next 6 months? (0=no, 1=yes)", type: "number" },
  { id: "account", label: "Do you have a checking account? (0=no, 1=yes)", type: "number" },
  { id: "saver", label: "Can you save $25/mo now? (0=no, 1=yes)", type: "number" },
  { id: "job", label: "Income consistent month-to-month? (0=no, 1=yes)", type: "number" },
  { id: "ins", label: "Do you have basic insurance? (0=no, 1=yes)", type: "number" },
  { id: "goal", label: "Have a short-term goal (e.g., $300 buffer)? (0=no, 1=yes)", type: "number" },
];

export default function Assess() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number | null>(null);

  function onChange(id: string, v: string) {
    const n = Number(v.replace(/[^0-9.]/g, ""));
    setA((s) => ({ ...s, [id]: Number.isFinite(n) ? n : 0 }));
  }

  function finish() {
    const income = a.income || 0;
    const needs = a.needs || 0;
    const debt = a.debtPay || 0;
    const savings = a.savings || 0;
    const util = Math.min(100, Math.max(0, a.util || 0));

    const dti = income ? Math.min(100, ((debt + needs) / Math.max(1, income)) * 100) : 100;
    const months = needs ? Math.min(6, savings / needs) : 0;

    const stability =
      ((a.housing ? 20 : 0) +
        (a.job ? 20 : 0) +
        (a.account ? 15 : 0) +
        (a.ins ? 10 : 0) +
        (a.goal ? 15 : 0) +
        (a.saver ? 20 : 0)) /
      100 * 100;
    const lateHit = a.late ? 15 : 0;

    const raw =
      (100 - Math.min(100, dti)) * 0.4 +
      Math.min(100, months * (100 / 6)) * 0.3 +
      (100 - util) * 0.15 +
      stability * 0.15 -
      lateHit;

    setScore(Math.round(Math.max(1, Math.min(100, raw))));
    setStep(qs.length + 1);
  }

  return (
    <section className="space-y-6">
      <SectionTitle kicker="Step-by-step">{t("assess.title")}</SectionTitle>

      {step === 0 && (
        <Card className="p-6">
          <p className="text-[var(--ink-2)]">
            Answer a few quick questions in plain language. We’ll show gentle next steps—no judgments.
          </p>
          <div className="mt-6">
            <Button onClick={() => setStep(1)}>{t("assess.start")}</Button>
          </div>
        </Card>
      )}

      {step > 0 && step <= qs.length && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-[var(--ink-2)]">Question {step} of {qs.length}</div>
            <div className="h-2 w-48 rounded bg-[var(--line)]">
              <div
                className="h-2 rounded bg-[var(--accent)] transition-[width]"
                style={{ width: `${(step / qs.length) * 100}%` }}
              />
            </div>
          </div>
          <Field
            label={qs[step - 1].label}
            hint={qs[step - 1].hint}
            type={qs[step - 1].type || "text"}
            inputMode="decimal"
            onChange={(e) => onChange(qs[step - 1].id, e.target.value)}
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < qs.length && <Button onClick={() => setStep(step + 1)}>{t("assess.next")}</Button>}
            {step === qs.length && <Button onClick={finish}>{t("assess.submit")}</Button>}
          </div>
        </Card>
      )}

      {step === qs.length + 1 && score !== null && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Your starting point</h2>
            <div className="mt-4 rounded-xl border border-[var(--line)] bg-white p-6 text-center">
              <div className="text-sm uppercase tracking-wide text-[var(--ink-2)]">Wellness Score</div>
              <div className="mt-2 text-5xl font-semibold">{score}</div>
              <div className="mt-2 text-sm text-[var(--ink-2)]">Higher is better (1–100)</div>
            </div>
          </Card>
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold">Next steps</h3>
            <ul className="mt-3 space-y-2 text-[var(--ink-2)]">
              <li>• If essentials + debt &gt;60% of income, we’ll build a spending plan together.</li>
              <li>• Aim for 1–3 months of expenses in savings; consider auto-transfer.</li>
              <li>• Keep credit card use under 30%; ask about balance transfer tools.</li>
              <li>• See transparent products tailored to your answers.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/products">
                <Button>Explore Products</Button>
              </a>
              <a href="/resources">
                <Button variant="outline">Resource Center</Button>
              </a>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}
