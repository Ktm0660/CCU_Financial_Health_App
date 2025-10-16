"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  calcDTI,
  calcEmergencyMonths,
  calcSavingsProgress,
  normalizeTo100,
} from "@/lib/health";

const sections = [
  {
    key: "income",
    title: "Income",
    description: "Share what comes in each month so we can understand your capacity to take on expenses and reach goals.",
    fields: [
      {
        name: "monthlyIncome",
        label: "Monthly take-home pay",
        placeholder: "e.g. 3500",
        help: "Use the amount you typically deposit after taxes.",
      },
    ],
  },
  {
    key: "expenses",
    title: "Expenses",
    description: "Now let us know what you spend and what goes toward debt payments each month.",
    fields: [
      {
        name: "monthlyExpenses",
        label: "Average monthly essentials",
        placeholder: "e.g. 2200",
        help: "Include housing, transportation, groceries, and utilities.",
      },
      {
        name: "totalDebtPayments",
        label: "Total monthly debt payments",
        placeholder: "e.g. 600",
        help: "Add up car loans, credit cards, student loans, and similar debts.",
      },
    ],
  },
  {
    key: "savings",
    title: "Savings",
    description: "A healthy safety net helps weather surprises. Tell us about what you have and how much you add.",
    fields: [
      {
        name: "emergencyFund",
        label: "Emergency savings balance",
        placeholder: "e.g. 1500",
        help: "Consider savings reserved for unexpected expenses.",
      },
      {
        name: "savingsContribution1",
        label: "Last month's savings contribution",
        placeholder: "e.g. 200",
        help: "Include transfers to savings, retirement, or investment goals.",
      },
      {
        name: "savingsContribution2",
        label: "Two months ago",
        placeholder: "Optional",
      },
      {
        name: "savingsContribution3",
        label: "Three months ago",
        placeholder: "Optional",
      },
    ],
  },
  {
    key: "credit",
    title: "Credit",
    description: "Finally, share how much of your available credit you're using.",
    fields: [
      {
        name: "creditUtilization",
        label: "Current credit utilization (%)",
        placeholder: "e.g. 28",
        help: "Estimate how much of your total credit limits you are currently using.",
      },
    ],
  },
] as const;

type FormValues = {
  [Key in
    | "monthlyIncome"
    | "totalDebtPayments"
    | "monthlyExpenses"
    | "emergencyFund"
    | "savingsContribution1"
    | "savingsContribution2"
    | "savingsContribution3"
    | "creditUtilization"]: string;
};

const initialValues: FormValues = {
  monthlyIncome: "",
  totalDebtPayments: "",
  monthlyExpenses: "",
  emergencyFund: "",
  savingsContribution1: "",
  savingsContribution2: "",
  savingsContribution3: "",
  creditUtilization: "",
};

export default function Assessment() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [step, setStep] = useState(0);

  const totalSteps = sections.length;
  const currentSection = sections[step];

  const progress = useMemo(() => Math.round(((step + 1) / totalSteps) * 100), [step, totalSteps]);

  const handleChange = (name: keyof FormValues, newValue: string) => {
    setValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
      return;
    }

    const monthlyIncome = Number(values.monthlyIncome) || 0;
    const totalDebtPayments = Number(values.totalDebtPayments) || 0;
    const monthlyExpenses = Number(values.monthlyExpenses) || 0;
    const emergencyFund = Number(values.emergencyFund) || 0;
    const creditUtilization = Number(values.creditUtilization) || 0;
    const contributions = [
      values.savingsContribution1,
      values.savingsContribution2,
      values.savingsContribution3,
    ].map((amount) => Number(amount) || 0);

    const dti = calcDTI({ monthlyIncome, totalDebtPayments });
    const emergencyMonths = calcEmergencyMonths({ monthlyExpenses, emergencyFund });
    const savingsProgress = calcSavingsProgress(contributions);
    const score = normalizeTo100(dti, emergencyMonths, savingsProgress, creditUtilization);

    const params = new URLSearchParams({
      score: String(score),
      dti: dti.toFixed(2),
      emergencyMonths: emergencyMonths.toFixed(2),
      savingsProgress: savingsProgress.toFixed(2),
      creditUtilization: creditUtilization.toString(),
    });

    router.push(`/results?${params.toString()}`);
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <main className="page">
      <section className="section">
        <div className="card" style={{ display: "grid", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "0.06em" }}>
              Step {step + 1} of {totalSteps}
            </span>
            <h1 className="heading" style={{ fontSize: "clamp(28px, 4vw, 40px)", margin: 0 }}>
              {currentSection.title}
            </h1>
            <p className="lead" style={{ margin: 0 }}>{currentSection.description}</p>
            <div
              aria-hidden
              style={{
                width: "100%",
                height: 8,
                borderRadius: 999,
                background: "rgba(37, 99, 235, 0.12)",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: `${progress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, var(--brand), var(--accent))",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
            <div className="stat-grid columns-2" style={{ gap: 20 }}>
              {currentSection.fields.map((field) => (
                <label key={field.name} className="field-label">
                  <span>{field.label}</span>
                  <input
                    required={field.name !== "savingsContribution2" && field.name !== "savingsContribution3"}
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    placeholder={field.placeholder}
                    value={values[field.name as keyof FormValues]}
                    onChange={(event) => handleChange(field.name as keyof FormValues, event.target.value)}
                    min="0"
                  />
                  {field.help ? <span className="field-help">{field.help}</span> : null}
                </label>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between" }}>
              <button type="button" onClick={handleBack} className="btn-secondary" disabled={step === 0}>
                Back
              </button>
              <button type="submit" className="btn-primary" style={{ marginLeft: "auto" }}>
                {step === totalSteps - 1 ? "See my results" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
