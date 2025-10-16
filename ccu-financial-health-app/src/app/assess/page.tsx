"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { resources } from "@/lib/resources";

// Answer scale: higher is better
type Answer = 0 | 1 | 2; // 0 = No, 1 = Sometimes, 2 = Yes
type OptionKey = "yes" | "sometimes" | "no" | "skip";

type Locale = "en" | "es";

type Q = {
  id: string;
  // If positive=true, Yes=2, Sometimes=1, No=0.
  // If positive=false, we flip (Yes=0, Sometimes=1, No=2).
  positive: boolean;
  // EN text
  prompt_en: string;
  note_en?: string;
  // ES text
  prompt_es: string;
  note_es?: string;
  // Flag hooks
  flag?: "unbanked" | "emergency" | "debt" | "volatility";
};

// Content (keep at 6th-grade reading level)
const QUESTIONS: Q[] = [
  {
    id: "cover-bills",
    positive: true,
    prompt_en: "Can you usually cover your monthly bills?",
    note_en: "Rent, power, phone, food.",
    prompt_es: "¿Sueles poder pagar tus cuentas mensuales?",
    note_es: "Renta, luz, teléfono, comida."
  },
  {
    id: "unexpected-200",
    positive: true,
    prompt_en: "If $200 came up today, could you handle it?",
    note_en: "A car tire, a medical copay.",
    prompt_es: "Si hoy surge un gasto de $200, ¿podrías cubrirlo?",
    note_es: "Una llanta, un copago médico.",
    flag: "emergency"
  },
  {
    id: "safe-banking",
    positive: true,
    prompt_en: "Do you have a safe place to keep money you trust?",
    note_en: "A checking or savings account.",
    prompt_es: "¿Tienes un lugar seguro y confiable para guardar tu dinero?",
    note_es: "Una cuenta de cheques o de ahorros.",
    flag: "unbanked"
  },
  {
    id: "fee-surprises",
    positive: false,
    prompt_en: "Do fees or costs surprise you often?",
    note_en: "Overdrafts, late fees, add-on charges.",
    prompt_es: "¿Las comisiones o costos te sorprenden con frecuencia?",
    note_es: "Descubiertos, cargos por atraso, cargos extra."
  },
  {
    id: "debt-control",
    positive: true,
    prompt_en: "Does debt feel under control?",
    note_en: "Cards, loans, buy-now-pay-later.",
    prompt_es: "¿Sientes que tus deudas están bajo control?",
    note_es: "Tarjetas, préstamos, compras a plazos.",
    flag: "debt"
  },
  {
    id: "income-steady",
    positive: true,
    prompt_en: "Is your income steady from month to month?",
    note_en: "About the same each month.",
    prompt_es: "¿Tus ingresos son estables de un mes a otro?",
    note_es: "Más o menos lo mismo cada mes.",
    flag: "volatility"
  },
  {
    id: "trusted-help",
    positive: true,
    prompt_en: "Do you have someone you trust for money questions?",
    note_en: "A counselor, coach, or guide.",
    prompt_es: "¿Tienes a alguien de confianza para dudas de dinero?",
    note_es: "Un consejero o asesor."
  },
  {
    id: "goal-small",
    positive: true,
    prompt_en: "Do you have a small money goal you’re working on?",
    note_en: "Like saving $10 a week.",
    prompt_es: "¿Tienes una meta pequeña de dinero en la que trabajas?",
    note_es: "Por ejemplo ahorrar $10 por semana."
  }
];

const LABELS = {
  en: {
    title: "Stability Check",
    intro: "8 quick questions. Plain language. No judgment.",
    yes: "Yes",
    sometimes: "Sometimes",
    no: "No",
    skip: "Prefer not to say",
    back: "Back",
    next: "Next",
    see: "See my result",
    result: "Your result",
    stable: "Stable",
    strained: "Strained",
    crisis: "In Crisis",
    steps: "Next best steps",
    resources: "Helpful resources",
    restart: "Start over",
    allResources: "See all resources",
    progress: (i: number, n: number) => `Question ${i} of ${n}`,
    lang: "Español",
    flagsTitle: "What we noticed"
  },
  es: {
    title: "Chequeo de Estabilidad",
    intro: "8 preguntas rápidas. Lenguaje claro. Sin juicios.",
    yes: "Sí",
    sometimes: "A veces",
    no: "No",
    skip: "Prefiero no decirlo",
    back: "Atrás",
    next: "Siguiente",
    see: "Ver mi resultado",
    result: "Tu resultado",
    stable: "Estable",
    strained: "Con presión",
    crisis: "En crisis",
    steps: "Próximos pasos",
    resources: "Recursos útiles",
    restart: "Empezar de nuevo",
    allResources: "Ver todos los recursos",
    progress: (i: number, n: number) => `Pregunta ${i} de ${n}`,
    lang: "English",
    flagsTitle: "Lo que notamos"
  }
};

const STORAGE_KEY = "stability-check-v2";

type SavedState = {
  locale: Locale;
  step: number;
  answers: Record<string, OptionKey | null>;
};

const DEFAULT_STATE: SavedState = {
  locale: "en",
  step: 0,
  answers: Object.fromEntries(QUESTIONS.map(q => [q.id, null])) as Record<string, OptionKey | null>
};

function optionKeyToScore(ok: OptionKey, positive: boolean): number {
  if (ok === "skip") return 0; // neutral for simplicity
  const base: Record<OptionKey, Answer> = { yes: 2, sometimes: 1, no: 0, skip: 0 };
  const val = base[ok];
  return positive ? val : (2 - val) as Answer; // flip if negative-polarity item
}

function outcomeFromScore(total: number) {
  if (total >= 12) return "Stable";
  if (total >= 7) return "Strained";
  return "In Crisis";
}

function tipsFor(outcome: string) {
  if (outcome === "Stable") {
    return [
      "Keep a small auto-save, even $5.",
      "Check your credit and set one goal.",
      "Meet a counselor to plan your next step."
    ];
  }
  if (outcome === "Strained") {
    return [
      "Talk with a counselor. Make a one-page plan.",
      "Use auto-pay to avoid late fees.",
      "Try our small-dollar relief loan for short gaps."
    ];
  }
  return [
    "You are not alone. Start with a short talk with a counselor.",
    "Avoid payday rollovers. Ask about our relief loan.",
    "Open a no-minimum savings and add $5 when you can."
  ];
}

export default function AssessPage() {
  const [state, setState] = useState<SavedState>(DEFAULT_STATE);

  // hydrate from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedState;
        // Basic shape guard
        if (parsed && typeof parsed.step === "number" && parsed.answers) {
          setState(prev => ({ ...prev, ...parsed }));
        }
      }
    } catch {}
  }, []);

  // persist to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const labels = LABELS[state.locale];
  const totalQuestions = QUESTIONS.length;
  const done = state.step >= totalQuestions;

  const totalScore = useMemo(() => {
    return QUESTIONS.reduce((sum, q) => {
      const ok = state.answers[q.id];
      if (!ok) return sum;
      return sum + optionKeyToScore(ok, q.positive);
    }, 0);
  }, [state.answers]);

  const outcome = useMemo(() => outcomeFromScore(totalScore), [totalScore]);

  // flags
  const flags = useMemo(() => {
    const f: Array<{ id: Q["flag"]; label: string }> = [];
    QUESTIONS.forEach(q => {
      if (!q.flag) return;
      const ok = state.answers[q.id];
      if (!ok) return;
      // Flag when answer is low on a positive item or high on a negative item
      const score = optionKeyToScore(ok, q.positive);
      if (score === 0 || score === 1) {
        const map: Record<NonNullable<Q["flag"]>, string> = {
          unbanked: state.locale === "en" ? "Bank access may be a barrier" : "El acceso bancario puede ser una barrera",
          emergency: state.locale === "en" ? "Emergency cash is tight" : "Falta efectivo para emergencias",
          debt: state.locale === "en" ? "Debt feels stressful" : "La deuda causa estrés",
          volatility: state.locale === "en" ? "Income swings month-to-month" : "Ingresos varían cada mes"
        };
        f.push({ id: q.flag, label: map[q.flag] });
      }
    });
    return f;
  }, [state.answers, state.locale]);

  // Resource mapping by outcome + flags
  const suggested = useMemo(() => {
    const baseTips = tipsFor(outcome);
    const byOutcome =
      outcome === "Stable"
        ? ["starter-savings", "itin-credit", "counseling"]
        : outcome === "Strained"
        ? ["relief-loan", "counseling", "starter-savings"]
        : ["relief-loan", "counseling", "access-onramp"];
    const extras: string[] = [];
    if (flags.some(f => f.id === "unbanked")) extras.push("access-onramp");
    if (flags.some(f => f.id === "emergency")) extras.push("relief-loan");
    if (flags.some(f => f.id === "debt")) extras.push("counseling");
    if (flags.some(f => f.id === "volatility")) extras.push("starter-savings");
    const picks = [...new Set([...byOutcome, ...extras])].slice(0, 4);
    const res = resources.filter(r => picks.includes(r.id));
    return { baseTips, res };
  }, [outcome, flags]);

  function setAnswer(qid: string, ok: OptionKey) {
    setState(prev => ({ ...prev, answers: { ...prev.answers, [qid]: ok } }));
  }

  function next() {
    setState(prev => ({ ...prev, step: Math.min(prev.step + 1, totalQuestions) }));
  }
  function back() {
    setState(prev => ({ ...prev, step: Math.max(prev.step - 1, 0) }));
  }
  function restart() {
    setState(DEFAULT_STATE);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }
  function toggleLocale() {
    setState(prev => ({ ...prev, locale: prev.locale === "en" ? "es" : "en" }));
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm underline">&larr; Home</Link>
        <button
          onClick={toggleLocale}
          className="rounded border px-3 py-1 text-sm"
          aria-label="Toggle language"
        >
          {labels.lang}
        </button>
      </div>

      <h1 className="mt-4 text-3xl font-bold">{labels.title}</h1>
      <p className="mt-2 text-neutral-700">{labels.intro}</p>

      {!done && (
        <section className="mt-6">
          {/* Progress */}
          <div aria-hidden className="mb-3 h-2 w-full rounded bg-neutral-200">
            <div
              className="h-2 rounded bg-black transition-all"
              style={{ width: `${(state.step / totalQuestions) * 100}%` }}
            />
          </div>
          <p className="text-xs text-neutral-600">
            {labels.progress(state.step + 1, totalQuestions)}
          </p>

          {/* Current question */}
          {(() => {
            const q = QUESTIONS[state.step];
            const prompt = state.locale === "en" ? q.prompt_en : q.prompt_es;
            const note = state.locale === "en" ? q.note_en : q.note_es;
            const current = state.answers[q.id];

            const OPTIONS: { key: OptionKey; label: string }[] = [
              { key: "yes", label: labels.yes },
              { key: "sometimes", label: labels.sometimes },
              { key: "no", label: labels.no },
              { key: "skip", label: labels.skip }
            ];

            return (
              <div className="mt-4 rounded-lg border p-4">
                <p className="text-lg">{prompt}</p>
                {note && <p className="mt-1 text-sm text-neutral-600">{note}</p>}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {OPTIONS.map(o => (
                    <button
                      key={o.key}
                      onClick={() => setAnswer(q.id, o.key)}
                      className={`rounded-md border px-3 py-3 text-sm
                        ${current === o.key ? "bg-black text-white" : "bg-white"}`}
                      aria-pressed={current === o.key}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={back}
                    className="rounded-md border px-4 py-2 disabled:opacity-50"
                    disabled={state.step === 0}
                  >
                    {labels.back}
                  </button>
                  <button
                    onClick={next}
                    className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
                    disabled={state.answers[q.id] == null}
                  >
                    {state.step === totalQuestions - 1 ? labels.see : labels.next}
                  </button>
                </div>
              </div>
            );
          })()}
        </section>
      )}

      {done && (
        <section className="mt-6 space-y-6">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-neutral-600">{labels.result}</p>
            <h2 className="mt-1 text-2xl font-semibold">
              {outcome === "Stable"
                ? labels.stable
                : outcome === "Strained"
                ? labels.strained
                : labels.crisis}
            </h2>
            {flags.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium">{labels.flagsTitle}</p>
                <ul className="mt-2 space-y-1">
                  {flags.map((f, i) => (
                    <li key={i} className="text-sm">• {f.label}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-3">
              This is a starting point. It’s not a label. We can move forward together.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">
              {labels.steps}
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {suggested.baseTips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold">{labels.resources}</h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {suggested.res.map(r => (
                <a key={r.id} href={r.href} className="rounded-md border p-3 hover:bg-neutral-50">
                  <div className="text-xs uppercase tracking-wide text-neutral-500">{r.tag}</div>
                  <div className="mt-1 font-medium">{r.title}</div>
                  <p className="mt-1 text-sm text-neutral-700">{r.summary}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={restart} className="rounded-md border px-4 py-2">
              {labels.restart}
            </button>
            <Link href="/resources" className="rounded-md bg-black px-4 py-2 text-white">
              {labels.allResources}
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
