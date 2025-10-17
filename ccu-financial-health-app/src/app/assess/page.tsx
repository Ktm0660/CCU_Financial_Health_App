"use client";

import { useMemo, useState, ChangeEvent } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import { useLanguage } from "@/components/LanguageProvider";

type Question = {
  id: string;
  label_en: string;
  label_es: string;
  type: "yn" | "scale" | "number";
  min?: number;
  max?: number;
  step?: number;
};

type BandKey = "strong" | "steady" | "starting" | "urgent";

const QUESTIONS: Question[] = [
  { id: "budget", label_en: "Do you use a simple monthly plan (budget)?", label_es: "¿Usa un plan mensual sencillo (presupuesto)?", type: "yn" },
  { id: "safety", label_en: "Could you cover a $400 surprise without borrowing?", label_es: "¿Puede cubrir un gasto sorpresa de $400 sin pedir prestado?", type: "yn" },
  { id: "housing", label_en: "Is rent/mortgage under 30% of take-home pay?", label_es: "¿La renta/hipoteca es menos del 30% de su ingreso neto?", type: "yn" },
  { id: "food", label_en: "Is food spending under 15% of take-home pay?", label_es: "¿El gasto en comida es menos del 15% de su ingreso neto?", type: "yn" },
  { id: "transport", label_en: "Is car/transport under 15% of take-home pay?", label_es: "¿El transporte es menos del 15% de su ingreso neto?", type: "yn" },
  {
    id: "debt_stress",
    label_en: "How stressed do debts make you? (0 none – 5 high)",
    label_es: "¿Qué tanto estrés le causan las deudas? (0 nada – 5 alto)",
    type: "scale",
    min: 0,
    max: 5,
    step: 1,
  },
  { id: "credit_score", label_en: "Do you know your credit score range?", label_es: "¿Conoce su rango de puntaje crediticio?", type: "yn" },
  { id: "save_auto", label_en: "Do you save automatically each payday?", label_es: "¿Ahorra automáticamente cada día de pago?", type: "yn" },
  { id: "late_fees", label_en: "Any late/NSF fees last 3 months?", label_es: "¿Tuvo cargos por pago tardío/NSF en 3 meses?", type: "yn" },
  { id: "income_vari", label_en: "Is your income amount similar each month?", label_es: "¿Su ingreso es similar cada mes?", type: "yn" },
  { id: "help_trust", label_en: "Would judgment-free coaching be helpful?", label_es: "¿Le ayudaría un asesoramiento sin juicios?", type: "yn" },
  { id: "goals_ready", label_en: "Ready to pick one small goal today?", label_es: "¿Listo para elegir una meta pequeña hoy?", type: "yn" },
];

type Recommendation = { en: string; es: string };

function ynScore(value: string) {
  if (value === "yes") return 1;
  if (value === "no") return 0;
  if (value === "unsure") return 0.5;
  return 0;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function AssessPage() {
  const { language, toggle } = useLanguage();
  const isSpanish = language === "es";
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const updateAnswer = (id: string) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAnswers((prev) => ({ ...prev, [id]: event.target.value }));
  };

  const score = useMemo(() => {
    let points = 0;
    let total = 0;
    QUESTIONS.forEach((question) => {
      const value = answers[question.id];
      if (!value) return;
      total += 1;
      if (question.type === "yn") {
        points += ynScore(value);
      } else if (question.type === "scale") {
        const numeric = parseFloat(value);
        const fraction = 1 - clamp(numeric, question.min ?? 0, question.max ?? 5) / (question.max ?? 5);
        points += fraction;
      }
    });
    if (total === 0) return 0;
    return clamp(Math.round((points / total) * 100), 0, 100);
  }, [answers]);

  const bandKey: BandKey = score >= 80 ? "strong" : score >= 60 ? "steady" : score >= 40 ? "starting" : "urgent";

  const recommendations = useMemo(() => {
    const recs: Recommendation[] = [];
    if (answers["budget"] !== "yes") {
      recs.push({
        en: "Make a 10-minute spending plan (three buckets: needs, goals, fun).",
        es: "Cree un plan de gastos de 10 minutos (tres categorías: necesidades, metas y diversión).",
      });
    }
    if (answers["safety"] !== "yes") {
      recs.push({
        en: "Open Savings and turn on $10 auto-transfer each payday.",
        es: "Abra una cuenta de ahorros y active una transferencia automática de $10 cada día de pago.",
      });
    }
    if (answers["late_fees"] === "yes" || answers["income_vari"] !== "yes") {
      recs.push({
        en: "Set up free alerts + payment due dates.",
        es: "Configure alertas gratuitas y recordatorios de pagos.",
      });
    }
    if (answers["save_auto"] !== "yes") {
      recs.push({
        en: "Set automatic savings or round-up.",
        es: "Active ahorros automáticos o redondeo de compras.",
      });
    }
    if (answers["credit_score"] !== "yes") {
      recs.push({
        en: "Check free credit score in app/branch and set a goal band.",
        es: "Consulte su puntaje de crédito gratis en la app/sucursal y elija una meta.",
      });
    }
    if (answers["debt_stress"] !== undefined && answers["debt_stress"] !== "") {
      const numeric = Number(answers["debt_stress"]);
      if (Number.isFinite(numeric) && numeric >= 3) {
        recs.push({
          en: "Debt feels heavy—consider Credit Builder or a payoff plan with a counselor.",
          es: "Si la deuda pesa, considere Credit Builder o un plan de pago con un asesor.",
        });
      }
    }
    if (answers["help_trust"] === "yes") {
      recs.push({
        en: "Book a free confidential coaching session.",
        es: "Agende una sesión confidencial y gratuita con un asesor.",
      });
    }
    return recs.slice(0, 6);
  }, [answers]);

  const bandLabel: Record<"en" | "es", Record<BandKey, string>> = {
    en: { strong: "Strong", steady: "Steady", starting: "Getting Started", urgent: "Urgent Support" },
    es: { strong: "Fuerte", steady: "Estable", starting: "Comenzando", urgent: "Apoyo urgente" },
  };

  const approximateScoreLabel = isSpanish ? "Puntaje aproximado" : "Approximate score";
  const nextStepsLabel = isSpanish ? "Siguientes pasos sugeridos" : "Suggested next steps";
  const emptyState = isSpanish
    ? "Responda algunas preguntas para ver recomendaciones."
    : "Answer a few questions to see recommendations.";

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--ink)]">
            {isSpanish ? "Chequeo financiero" : "Financial Checkup"}
          </h1>
          <p className="text-[var(--ink-2)]">
            {isSpanish
              ? "12 preguntas sencillas. Recomendaciones claras."
              : "12 simple questions. Clear, judgment-free next steps."}
          </p>
        </div>
        <button
          onClick={toggle}
          className="rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink-2)] transition hover:bg-[var(--bg)]"
        >
          {isSpanish ? "ESPAÑOL ✓" : "ESPAÑOL"}
        </button>
      </div>

      <Card className="p-6">
        <div className="grid gap-6">
          {QUESTIONS.map((question) => (
            <div key={question.id} className="border-b border-[var(--line)] pb-4 last:border-none">
              <p className="font-medium text-[var(--ink)]">
                {isSpanish ? question.label_es : question.label_en}
              </p>
              {question.type === "yn" && (
                <div className="mt-2 flex gap-3 text-[var(--ink-2)]">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name={question.id}
                      value="yes"
                      checked={answers[question.id] === "yes"}
                      onChange={updateAnswer(question.id)}
                      className="h-4 w-4"
                    />
                    <span>{isSpanish ? "Sí" : "Yes"}</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name={question.id}
                      value="no"
                      checked={answers[question.id] === "no"}
                      onChange={updateAnswer(question.id)}
                      className="h-4 w-4"
                    />
                    <span>{isSpanish ? "No" : "No"}</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name={question.id}
                      value="unsure"
                      checked={answers[question.id] === "unsure"}
                      onChange={updateAnswer(question.id)}
                      className="h-4 w-4"
                    />
                    <span>{isSpanish ? "No seguro" : "Unsure"}</span>
                  </label>
                </div>
              )}
              {question.type === "scale" && (
                <div className="mt-2">
                  <input
                    type="range"
                    min={question.min ?? 0}
                    max={question.max ?? 5}
                    step={question.step ?? 1}
                    value={answers[question.id] ?? String(question.min ?? 0)}
                    onChange={updateAnswer(question.id)}
                    className="w-full accent-[var(--accent)]"
                  />
                  <div className="mt-1 flex justify-between text-xs text-[var(--ink-2)]">
                    <span>{isSpanish ? "Bajo" : "Low"}</span>
                    <span>{isSpanish ? "Alto" : "High"}</span>
                  </div>
                </div>
              )}
              {question.type === "number" && (
                <input
                  type="number"
                  min={question.min}
                  max={question.max}
                  step={question.step ?? 1}
                  value={answers[question.id] ?? ""}
                  onChange={updateAnswer(question.id)}
                  className="mt-2 w-40 rounded-md border border-[var(--line)] px-3 py-2"
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-[var(--ink-2)]">{approximateScoreLabel}</p>
          <p className="mt-1 text-4xl font-extrabold text-[var(--ink)]">{score}</p>
          <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
            {bandLabel[language][bandKey]}
          </p>
        </Card>
        <Card className="p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-[var(--ink)]">{nextStepsLabel}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--ink-2)]">
            {recommendations.length > 0
              ? recommendations.map((rec, index) => <li key={index}>{rec[language]}</li>)
              : <li>{emptyState}</li>}
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--bg)]"
            >
              {isSpanish ? "Ver productos que ayudan" : "See products that help"}
            </Link>
            <a
              href="https://www.connectidaho.org/"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-700)]"
            >
              {isSpanish ? "Hablar con un asesor" : "Talk to a counselor"}
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
