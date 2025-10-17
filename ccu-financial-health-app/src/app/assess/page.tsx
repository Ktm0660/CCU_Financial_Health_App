"use client";
import { useState } from "react";
import { Card, Button, Field, SectionTitle } from "@/components/ui";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-client";

type Answer = string | number;
const q = [
  { id: "income", label: "Monthly take-home pay", placeholder: "e.g. 3500", hint: "Your usual deposit after taxes." },
  { id: "expenses", label: "Monthly expenses (needs)", placeholder: "e.g. 2200", hint: "Housing, food, utilities, transport." },
  { id: "debt", label: "Total monthly debt payments", placeholder: "e.g. 450", hint: "Loans, credit cards, etc." },
  { id: "savings", label: "Emergency savings ($)", placeholder: "e.g. 800", hint: "What you could use in a pinch." },
  { id: "credit", label: "Credit card utilization %", placeholder: "e.g. 40", hint: "Used balance ÷ limit × 100." },
];

export default function AssessPage() {
  useLocale();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [score, setScore] = useState<number | null>(null);

  function next() {
    if (step < q.length) setStep(step + 1);
  }
  function prev() {
    if (step > 0) setStep(step - 1);
  }
  function onChange(id: string, val: string) {
    const num = Number(val.replace(/[^0-9.]/g, ""));
    setAnswers((a) => ({ ...a, [id]: Number.isFinite(num) ? num : 0 }));
  }

  function finish() {
    const income = Number(answers.income || 0);
    const needs = Number(answers.expenses || 0);
    const debt = Number(answers.debt || 0);
    const savings = Number(answers.savings || 0);
    const util = Math.min(100, Math.max(0, Number(answers.credit || 0)));

    // naive, gentle scoring: lower DTI/util is better; more savings is better
    const dti = income ? Math.min(100, ((debt + needs) / Math.max(1, income)) * 100) : 100;
    const savingsMonths = income ? Math.min(6, savings / Math.max(1, (needs || 1))) : 0; // cap at 6
    const raw =
      (100 - Math.min(100, dti)) * 0.45 + // capacity
      (Math.min(100, savingsMonths * (100 / 6))) * 0.35 + // cushion
      (100 - util) * 0.20; // credit stress
    const normalized = Math.round(Math.max(1, Math.min(100, raw)));
    setScore(normalized);
    setStep(q.length + 1);
  }

  return (
    <section className="space-y-6">
      <SectionTitle kicker="Step-by-step">{t("assess.title")}</SectionTitle>

      {step === 0 && (
        <Card className="p-6">
          <p className="text-[#335E7E]">
            Answer a few quick questions in plain language. We’ll show gentle next steps and tools—no judgments.
          </p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => setStep(1)}>{t("assess.start")}</Button>
          </div>
        </Card>
      )}

      {step > 0 && step <= q.length && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-[#335E7E]">
              Question {step} of {q.length}
            </div>
            <div className="h-2 w-40 rounded bg-[#E6EEF7]">
              <div
                className="h-2 rounded bg-[#2E6D8A] transition-[width]"
                style={{ width: `${(step / q.length) * 100}%` }}
              />
            </div>
          </div>
          <Field
            label={q[step - 1].label}
            placeholder={q[step - 1].placeholder}
            hint={q[step - 1].hint}
            inputMode="decimal"
            onChange={(e) => onChange(q[step - 1].id, e.target.value)}
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {step > 1 && <Button variant="outline" onClick={prev}>Back</Button>}
            {step < q.length && <Button onClick={next}>{t("assess.next")}</Button>}
            {step === q.length && <Button onClick={finish}>{t("assess.submit")}</Button>}
          </div>
        </Card>
      )}

      {step === q.length + 1 && score !== null && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-1">
            <h2 className="text-xl font-semibold text-[#0B2E4E]">{t("assess.result.title")}</h2>
            <div className="mt-4 rounded-xl border border-[#E6EEF7] bg-white p-6 text-center">
              <div className="text-sm uppercase tracking-wide text-[#335E7E]">Wellness Score</div>
              <div className="mt-2 text-5xl font-semibold text-[#0B2E4E]">{score}</div>
              <div className="mt-2 text-sm text-[#335E7E]">Higher is better (1–100)</div>
            </div>
            <p className="mt-4 text-sm text-[#335E7E]">
              We use your capacity, cushion, and credit stress to estimate a starting point.
            </p>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-[#0B2E4E]">{t("assess.result.cta")}</h3>
            <ul className="mt-4 space-y-3 text-[#335E7E]">
              <li>• If your expenses + debt are over 60% of income, let’s review a spending plan together.</li>
              <li>• Aim for 1–3 months of expenses in an emergency fund; automatic transfers can help.</li>
              <li>• Keep credit card use under 30% of your limit; ask about balance transfer options.</li>
              <li>• Prefer cash-flow friendly tools (no surprise fees); see Products for transparent choices.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/products" className="no-underline">
                <Button>Explore Products</Button>
              </a>
              <a href="https://www.connectidaho.org/resources" target="_blank" className="no-underline">
                <Button variant="outline">Learn in the Resource Center</Button>
              </a>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}
