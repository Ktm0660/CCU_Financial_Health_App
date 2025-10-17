'use client'
import { useState, useMemo } from 'react'
import { QUESTIONS, scoreAssessment, recommendProducts } from '@/lib/assessment'
import { PRODUCTS } from '@/lib/products'

export default function AssessPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const result = useMemo(() => scoreAssessment(answers), [answers])
  const recs = useMemo(() => recommendProducts(answers), [answers])
  const products = PRODUCTS.filter(p => recs.includes(p.id))

  const setVal = (id: string, val: number) => setAnswers(a => ({ ...a, [id]: val }))

  return (
    <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <section className="card p-6">
        <h1 className="text-2xl font-bold text-brand-navy">Your Money Checkup</h1>
        <p className="text-brand-stone mt-2">Answer in under 2 minutes. No sensitive info, just a quick snapshot.</p>

        <ol className="mt-6 space-y-5">
          {QUESTIONS.map((q, i) => (
            <li key={q.id} className="rounded-xl border border-black/5 p-4">
              <div className="text-sm text-brand-stone">Question {i + 1} of {QUESTIONS.length}</div>
              <div className="mt-1 font-medium text-brand-ink">{q.text}</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {['No', 'Sometimes', 'Yes'].map((label, idx) => (
                  <button
                    key={label}
                    onClick={() => setVal(q.id, idx)}
                    className={[
                      'rounded-lg border px-3 py-2 text-sm',
                      answers[q.id] === idx
                        ? 'border-brand-gold bg-brand-sand'
                        : 'border-black/10 bg-white hover:bg-brand-sky'
                    ].join(' ')}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <aside className="space-y-6">
        <div className="card p-5">
          <div className="text-sm text-brand-stone">Your Score</div>
          <div className="text-3xl font-bold text-brand-navy mt-1">{result.percent}%</div>
          <div className="text-sm mt-1">Status: <span className="font-semibold">{result.band}</span></div>
        </div>

        <div className="card p-5">
          <h3 className="text-lg font-semibold text-brand-navy">Recommended for You</h3>
          <ul className="mt-3 space-y-3">
            {products.length === 0 && <li className="text-brand-stone text-sm">Answer a few questions to see suggestions.</li>}
            {products.map(p => (
              <li key={p.id} className="border border-black/5 rounded-lg p-3">
                <div className="font-medium text-brand-ink">{p.name}</div>
                <div className="text-sm text-brand-stone">{p.description}</div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-blue underline text-sm mt-1 inline-block"
                >
                  Learn more
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
