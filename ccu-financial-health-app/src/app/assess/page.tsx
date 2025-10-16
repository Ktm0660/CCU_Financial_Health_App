"use client";

import React, { useMemo, useState } from "react";
import { Navbar, SectionTitle, Card, Button, Progress } from "@/components/ui";
import {
  calcDTI,
  calcEmergencyMonths,
  calcSavingsProgress,
  normalizeTo100,
  scoreToBand,
  buildRecommendations,
} from "@/lib/health";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "number" | "text" | "currency" | "percent";
  step?: string | number;
  min?: number;
  optional?: boolean;
  help?: string;
};

type Inputs = {
  monthlyIncome: number | null;
  monthlyExpenses: number | null;
  emergencyFund: number | null;
  totalDebtPayments: number | null;
  creditUtilization: number | null;
  savingsContributions: number[];
};

const incomeFields: Field[] = [
  {
    name: "monthlyIncome",
    label: "Average monthly take-home pay",
    placeholder: "e.g., 4200",
    type: "currency",
    min: 0,
  },
];

const expenseFields: Field[] = [
  {
    name: "monthlyExpenses",
    label: "Monthly expenses (all-in)",
    placeholder: "e.g., 3500",
    type: "currency",
    min: 0,
  },
];

const savingsFields: Field[] = [
  {
    name: "emergencyFund",
    label: "Emergency fund balance",
    placeholder: "e.g., 2000",
    type: "currency",
    min: 0,
    help: "Include cash or savings you could tap within a few days.",
  },
  {
    name: "savingsContributions",
    label: "Optional: monthly savings contributions",
    placeholder: "100, 75, 50",
    type: "text",
    optional: true,
    help: "Separate multiple goals with commas (retirement, emergency, etc.).",
  },
];

const creditFields: Field[] = [
  {
    name: "totalDebtPayments",
    label: "Total monthly debt payments",
    placeholder: "e.g., 600",
    type: "currency",
    min: 0,
  },
  {
    name: "creditUtilization",
    label: "Credit utilization (%)",
    placeholder: "e.g., 35",
    type: "percent",
    step: 1,
    min: 0,
    help: "Estimate how much of your total credit limits you’re currently using.",
  },
];

const groups = [
  {
    key: "income",
    title: "Earn",
    description: "Your steady take-home pay after taxes and deductions.",
    fields: incomeFields,
  },
  {
    key: "expense",
    title: "Spend",
    description: "What it costs to run your household each month.",
    fields: expenseFields,
  },
  {
    key: "savings",
    title: "Save",
    description: "Money you’ve set aside plus any recurring contributions.",
    fields: savingsFields,
  },
  {
    key: "credit",
    title: "Borrow",
    description: "Monthly debt payments and how much credit you’re using.",
    fields: creditFields,
  },
];

const previewPillars = [
  { key: "earn", title: "Earn", desc: "Build stable, resilient income." },
  { key: "spend", title: "Spend", desc: "Align spending with your values." },
  { key: "save", title: "Save", desc: "Grow your safety net and goals." },
  { key: "borrow", title: "Borrow", desc: "Use credit as a tool, not a trap." },
  { key: "plan", title: "Plan", desc: "Protect tomorrow with smart moves." },
];

const initialInputs: Inputs = {
  monthlyIncome: null,
  monthlyExpenses: null,
  emergencyFund: null,
  totalDebtPayments: null,
  creditUtilization: null,
  savingsContributions: [],
};

export default function AssessOverview() {
  const [inputs, setInputs] = useState<Inputs>(initialInputs);
  const [savingsText, setSavingsText] = useState("");

  const requiredComplete =
    inputs.monthlyIncome != null &&
    inputs.monthlyExpenses != null &&
    inputs.emergencyFund != null &&
    inputs.totalDebtPayments != null &&
    inputs.creditUtilization != null;

  const results = useMemo(() => {
    if (!requiredComplete) {
      return null;
    }
    const dti = calcDTI({
      monthlyIncome: inputs.monthlyIncome ?? 0,
      totalDebtPayments: inputs.totalDebtPayments ?? 0,
    });
    const emerg = calcEmergencyMonths({
      monthlyExpenses: inputs.monthlyExpenses ?? 0,
      emergencyFund: inputs.emergencyFund ?? 0,
    });
    const savings = calcSavingsProgress(inputs.savingsContributions ?? []);
    const total = normalizeTo100(
      dti ?? 0,
      emerg ?? 0,
      savings ?? 0,
      inputs.creditUtilization ?? 0,
    );
    const band = scoreToBand(total);
    const recs = buildRecommendations(
      dti ?? 0,
      emerg ?? 0,
      savings ?? 0,
      inputs.creditUtilization ?? 0,
    );
    return { dti, emerg, savings, total, band, recs };
  }, [inputs, requiredComplete]);

  const reportHref = useMemo(() => {
    if (!results) {
      return null;
    }
    const params = new URLSearchParams({
      score: String(results.total),
      band: results.band,
      dti: String(results.dti ?? 0),
      emerg: String(results.emerg ?? 0),
      savings: String(results.savings ?? 0),
      credit: String(inputs.creditUtilization ?? 0),
      recs: encodeURIComponent(JSON.stringify(results.recs ?? [])),
    });
    return `/report?${params.toString()}`;
  }, [inputs.creditUtilization, results]);

  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: 28, paddingBottom: 40 }}>
        <SectionTitle
          eyebrow="Financial Health"
          title="Your 5-Pillar Assessment"
          desc="Get a kind, clear snapshot of where you are today and the next small step to grow."
        />
        <Card style={{ padding: 20, marginBottom: 24 }}>
          <div className="grid grid-2">
            <div>
              <div className="h2">What you’ll see</div>
              <ul style={{ marginTop: 10, color: "var(--muted)" }}>
                <li>• Scores for Earn, Spend, Save, Borrow, Plan</li>
                <li>• A total score out of 100</li>
                <li>• Gentle recommendations—no judgment</li>
              </ul>
              <div style={{ marginTop: 16 }}>
                <Button asLinkHref="/assess/start">Start assessment</Button>
              </div>
            </div>
            <div>
              {previewPillars.map((p, i) => (
                <div key={p.key} style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <strong>{p.title}</strong>
                    <span style={{ color: "var(--muted)" }}>{12 + i * 2}/20</span>
                  </div>
                  <Progress value={(12 + i * 2) * 5} />
                </div>
              ))}
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>Total</strong>
                <strong>68/100</strong>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-2" style={{ marginBottom: 32 }}>
          {previewPillars.map((p) => (
            <Card key={p.key} style={{ padding: 18 }}>
              <div className="h2">{p.title}</div>
              <p style={{ color: "var(--muted)", margin: "8px 0 14px" }}>{p.desc}</p>
              <Progress value={0} />
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  color: "var(--muted)",
                }}
              >
                <span>Score</span>
                <span>—/20</span>
              </div>
            </Card>
          ))}
        </div>

        <Card style={{ padding: 24 }}>
          <div className="h2" style={{ marginBottom: 8 }}>
            Enter what you know
          </div>
          <p className="lead" style={{ marginBottom: 18 }}>
            Share a few numbers. We’ll crunch them privately in your browser and update the results below.
          </p>
          <div className="grid grid-2" style={{ gap: 24 }}>
            {groups.map((group) => (
              <section key={group.key}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{group.title}</div>
                <p style={{ color: "var(--muted)", margin: "6px 0 14px" }}>{group.description}</p>
                <div style={{ display: "grid", gap: 12 }}>
                  {group.fields.map((field: Field) => (
                    <div key={field.name}>
                      <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                        {field.label}
                        {field.optional ? " (optional)" : ""}
                      </label>
                      <input
                        value={getFieldValue(field, inputs, savingsText)}
                        onChange={(event) =>
                          handleFieldChange(field, event.target.value, setInputs, setSavingsText)
                        }
                        inputMode={field.type === "text" ? undefined : "decimal"}
                        placeholder={field.placeholder}
                        min={field.min}
                        step={field.step}
                        style={inputStyle}
                      />
                      {field.help ? <span className="field-help">{field.help}</span> : null}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <div className="h2" style={{ fontSize: 20, marginBottom: 12 }}>
              Your results
            </div>
            {requiredComplete && results ? (
              <div className="grid grid-2" style={{ gap: 20 }}>
                <Card style={{ padding: 18 }}>
                  <div style={metricRow}>
                    <span>Debt-to-Income</span>
                    <strong>{formatRatio(results.dti)}</strong>
                  </div>
                  <div style={metricRow}>
                    <span>Emergency months</span>
                    <strong>{formatMonths(results.emerg)}</strong>
                  </div>
                  <div style={metricRow}>
                    <span>Savings progress</span>
                    <strong>{formatPercent(results.savings)}</strong>
                  </div>
                  <div style={{ margin: "14px 0 6px", fontWeight: 600 }}>Total score</div>
                  <Progress value={results.total} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 6,
                    }}
                  >
                    <span style={{ color: "var(--muted)" }}>Band</span>
                    <strong>{results.band}</strong>
                  </div>
                  {reportHref ? (
                    <div style={{ marginTop: 16 }}>
                      <Button asLinkHref={reportHref}>See full report</Button>
                    </div>
                  ) : null}
                </Card>

                <Card style={{ padding: 18 }}>
                  <div className="h2" style={{ fontSize: 18, marginBottom: 10 }}>
                    Recommended next steps
                  </div>
                  <ul style={{ marginTop: 8, color: "var(--muted)" }}>
                    {(results.recs ?? []).slice(0, 3).map((rec, index) => (
                      <li key={index}>• {rec}</li>
                    ))}
                  </ul>
                </Card>
              </div>
            ) : (
              <p className="lead">Fill in the required fields above to unlock your results.</p>
            )}
          </div>
        </Card>
      </main>
    </>
  );
}

function getFieldValue(field: Field, inputs: Inputs, savingsText: string) {
  if (field.name === "savingsContributions") {
    return savingsText;
  }
  const value = inputs[field.name as keyof Inputs];
  if (value == null) {
    return "";
  }
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return String(value);
}

function handleFieldChange(
  field: Field,
  rawValue: string,
  setInputs: React.Dispatch<React.SetStateAction<Inputs>>,
  setSavingsText: React.Dispatch<React.SetStateAction<string>>,
) {
  if (field.name === "savingsContributions") {
    setSavingsText(rawValue);
    const amounts = rawValue
      .split(",")
      .map((part) => Number(part.trim().replace(/[^0-9.\-]/g, "")))
      .filter((value) => Number.isFinite(value) && value > 0);
    setInputs((prev) => ({ ...prev, savingsContributions: amounts }));
    return;
  }

  const numeric = parseNumeric(rawValue);
  if (field.type === "percent" && numeric != null) {
    const clamped = Math.max(0, Math.min(100, numeric));
    setInputs((prev) => ({ ...prev, [field.name as keyof Inputs]: clamped }));
    return;
  }

  setInputs((prev) => ({ ...prev, [field.name as keyof Inputs]: numeric }));
}

function parseNumeric(value: string): number | null {
  const cleaned = value.replace(/[^0-9.\-]/g, "").trim();
  if (!cleaned) {
    return null;
  }
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatRatio(value: number | null | undefined) {
  if (!Number.isFinite(value ?? NaN)) {
    return "—";
  }
  return `${Math.round((value ?? 0) * 100)}%`;
}

function formatMonths(value: number | null | undefined) {
  if (!Number.isFinite(value ?? NaN)) {
    return "—";
  }
  return `${Math.round((value ?? 0) * 10) / 10} months`;
}

function formatPercent(value: number | null | undefined) {
  if (!Number.isFinite(value ?? NaN)) {
    return "—";
  }
  return `${Math.round((value ?? 0) * 100)}%`;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  outline: "none",
  boxShadow: "0 0 0 0 var(--ring)",
};

const metricRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "6px 0",
  borderBottom: "1px solid #f1f5f9",
};
