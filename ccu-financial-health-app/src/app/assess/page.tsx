"use client";

import React from "react";
import { QUESTIONS, AssessmentAnswers, scoreDimensions, dimensionMessage, nextSteps } from "@/lib/assessmentModel";

type Lang = "en" | "es";

export default function AssessPage() {
  const [lang, setLang] = React.useState<Lang>("en");
  const [answers, setAnswers] = React.useState<AssessmentAnswers>(
    Object.fromEntries(QUESTIONS.map(q => [q.id, null]))
  );
  const [submitted, setSubmitted] = React.useState(false);

  const t = (en: string, es: string) => (lang === "en" ? en : es);

  const { Habits, Confidence, Stability } = scoreDimensions(answers);
  const overall = Math.round((Habits + Confidence + Stability) / 3);

  const handleSelect = (qid: string, value: number) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const resetForm = () => {
    setAnswers(Object.fromEntries(QUESTIONS.map(q => [q.id, null])));
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-emerald-600" />
            <h1 className="text-slate-900 font-semibold">
              {t("Connections Financial Wellness Assessment", "Evaluación de Bienestar Financiero de Connections")}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`text-sm px-3 py-1.5 rounded-md border ${lang === "en" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-300"}`}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              English
            </button>
            <button
              className={`text-sm px-3 py-1.5 rounded-md border ${lang === "es" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-300"}`}
              onClick={() => setLang("es")}
              aria-pressed={lang === "es"}
            >
              Español
            </button>
          </div>
        </div>
      </header>

      {/* Hero / intro */}
      <section className="bg-gradient-to-br from-emerald-50 to-sky-50 border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            {t("Let’s get a clear, judgment-free picture together",
               "Construyamos juntos una imagen clara y sin juicios")}
          </h2>
          <p className="mt-2 text-slate-700 max-w-3xl">
            {t(
              "Answer a few simple questions. We’ll show friendly insights and practical next steps. You can bring these to a counselor or use them on your own.",
              "Responda algunas preguntas sencillas. Le mostraremos ideas amigables y pasos prácticos. Puede llevarlos con un asesor o usarlos por su cuenta."
            )}
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 grid md:grid-cols-3 gap-6">
        {/* Questions */}
        <div className="md:col-span-2">
          <div className="bg-white shadow-sm rounded-xl border border-slate-200">
            <div className="px-4 py-3 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">
                {t("Your answers", "Sus respuestas")}
              </h3>
              <p className="text-sm text-slate-600">
                {t("Choose the option that fits you best — no right or wrong answers.",
                   "Elija la opción que más le represente — no hay respuestas correctas o incorrectas.")}
              </p>
            </div>

            <div className="p-4 space-y-6">
              {QUESTIONS.map((q, idx) => (
                <div key={q.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-6 w-6 shrink-0 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-semibold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{q.text[lang]}</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {q.choices[lang].map((c, i) => {
                          const isSelected = answers[q.id] === c.value;
                          return (
                            <button
                              key={i}
                              onClick={() => handleSelect(q.id, c.value)}
                              className={
                                "text-left w-full px-3 py-2 rounded-md border transition " +
                                (isSelected
                                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                                  : "bg-white text-slate-800 border-slate-300 hover:border-slate-400")
                              }
                            >
                              {c.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-slate-200 flex items-center gap-3">
              <button
                onClick={() => setSubmitted(true)}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
              >
                {t("See my results", "Ver mis resultados")}
              </button>
              <button
                onClick={resetForm}
                className="px-3 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                {t("Start over", "Comenzar de nuevo")}
              </button>
              <span className="ml-auto text-sm text-slate-500">
                {t("Takes about 3–4 minutes", "Toma unos 3–4 minutos")}
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        <aside className="md:col-span-1">
          <div className="bg-white shadow-sm rounded-xl border border-slate-200 sticky top-16">
            <div className="px-4 py-3 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">
                {t("Your results", "Sus resultados")}
              </h3>
            </div>

            <div className="p-4 space-y-4">
              <ScoreBar label={t("Overall", "General")} value={submitted ? overall : 0} />
              <ScoreBar label="Habits" value={submitted ? Habits : 0} />
              <ScoreBar label={t("Confidence", "Confianza")} value={submitted ? Confidence : 0} />
              <ScoreBar label={t("Stability", "Estabilidad")} value={submitted ? Stability : 0} />

              {submitted && (
                <div className="space-y-4">
                  <InsightCard
                    title="Habits"
                    body={dimensionMessage("Habits", Habits)}
                    items={nextSteps("Habits", Habits)}
                  />
                  <InsightCard
                    title={t("Confidence", "Confianza")}
                    body={dimensionMessage("Confidence", Confidence)}
                    items={nextSteps("Confidence", Confidence)}
                  />
                  <InsightCard
                    title={t("Stability", "Estabilidad")}
                    body={dimensionMessage("Stability", Stability)}
                    items={nextSteps("Stability", Stability)}
                  />
                  <div className="rounded-lg border border-slate-200 p-3">
                    <p className="text-sm text-slate-700">
                      {t(
                        "Want a friendly, judgment-free conversation? Our certified counselors can help you turn these results into a simple plan.",
                        "¿Quiere una conversación amable y sin juicios? Nuestros asesores certificados pueden ayudarle a convertir estos resultados en un plan sencillo."
                      )}
                    </p>
                    <a
                      href="/resources"
                      className="inline-block mt-2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                    >
                      {t("See resources and safer options →", "Ver recursos y opciones más seguras →")}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-slate-800 font-medium">{label}</span>
        <span className="text-slate-600">{value}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-emerald-600 transition-all"
          style={{ width: `${value}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          role="progressbar"
        />
      </div>
    </div>
  );
}

function InsightCard({ title, body, items }: { title: string; body: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <h4 className="font-semibold text-slate-900">{title}</h4>
      <p className="text-sm text-slate-700 mt-1">{body}</p>
      <ul className="mt-2 space-y-1">
        {items.map((it, i) => (
          <li key={i} className="text-sm text-slate-700 list-disc ml-5">{it}</li>
        ))}
      </ul>
    </div>
  );
}
