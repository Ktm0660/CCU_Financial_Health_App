"use client";
import { useMemo, useState } from "react";
import Container from "@/components/Container";
import Bar from "@/components/Bar";

/**
 * Connections CU · Simple 15-Question Assessment
 * Designed for rural & first-time bank users:
 * - One screen per question with big tappable chips
 * - Zero jargon; plain language; minimal typing
 * - Score 0–100 with category weights
 * - Gentle, transparent recommendations (not salesy)
 *
 * Categories & weights:
 * 1) Access & Basics (checking, direct deposit, ID/eligibility proxy) ........ 25
 * 2) Safety Net & Bills (emergency cash, current on housing/utilities) ....... 30
 * 3) Stability (transportation, phone/internet, income timing) ............... 20
 * 4) Obligations & Risk (payday/title loan, collections, debt stress) ........ 15
 * 5) Confidence & Support (comfort reading statements, counselor opt-in) ..... 10
 */

type ChipVal = string;

type Q = {
  id: string;
  label: string;
  help?: string;
  kind: "chips" | "number";
  options?: ChipVal[]; // for chips
  optional?: boolean;
};

const QUESTIONS: Q[] = [
  { id:"q1_checking", label:"Do you have a checking account right now?", kind:"chips", options:["Yes","No","Not sure"] },
  { id:"q2_deposit", label:"Do you use direct deposit for income?", kind:"chips", options:["Yes","No","Sometimes"] },
  { id:"q3_liquidity", label:"If you needed cash today, about how much could you use?", kind:"chips", options:["None","$1–$100","$100–$500",">$500"] },
  { id:"q4_housing_current", label:"Are you current on rent or mortgage?", kind:"chips", options:["Yes","No","Not applicable"] },
  { id:"q5_utils_current", label:"Are you current on utilities/phone?", kind:"chips", options:["Yes","No"] },
  { id:"q6_highcost", label:"Do you have a payday/title/online loan right now?", kind:"chips", options:["Yes","No"] },
  { id:"q7_collections", label:"Is anything in collections?", kind:"chips", options:["Yes","No","Not sure"] },
  { id:"q8_transport", label:"Is your transportation reliable most weeks?", kind:"chips", options:["Yes","No"] },
  { id:"q9_connectivity", label:"Is your phone or internet reliable most weeks?", kind:"chips", options:["Yes","No"] },
  { id:"q10_income_timing", label:"Is your income timing steady most months?", kind:"chips", options:["Steady","Varies"] },
  { id:"q11_set_aside", label:"Could you set aside at least $20 each paycheck?", kind:"chips", options:["Yes","Some months","No"] },
  { id:"q12_comfort", label:"Reading statements/fees feels…", kind:"chips", options:["Comfortable","I need help"] },
  { id:"q13_language", label:"Preferred language for materials", kind:"chips", options:["English","Español"] },
  { id:"q14_priority", label:"Which is your top priority?", kind:"chips", options:["Build savings","Lower debt","Credit score","Car","Home","Just learn"] },
  { id:"q15_counselor", label:"Would you like a counselor to reach out (free)?", kind:"chips", options:["Yes","No"] },
];

// UI bits
function Chip({label, pressed, onClick}:{label:string; pressed:boolean; onClick:()=>void}) {
  return (
    <button
      type="button"
      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium transition-colors hover:border-[color:#0E7DB6] hover:text-[color:#0E7DB6] data-[active=true]:bg-[rgb(14,125,182,0.10)]"
      data-active={pressed}
      aria-pressed={pressed}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

type Band = "Great" | "Okay" | "Needs attention";
function bandFor(score:number): Band {
  if (score >= 75) return "Great";
  if (score >= 50) return "Okay";
  return "Needs attention";
}

// Recommendation helper
type Rec = { title:string; why:string };
function uniquePush(arr:Rec[], item:Rec) {
  if (!arr.find(x=>x.title===item.title)) arr.push(item);
}

export default function Assess() {
  const [step, setStep] = useState(0); // index into QUESTIONS
  const [answers, setAnswers] = useState<Record<string, ChipVal | number | null>>({});

  const q = QUESTIONS[step];

  function setAnswer(id:string, val:ChipVal | number) {
    setAnswers(prev => ({...prev, [id]: val}));
  }

  const progressPercent = Math.round((step / QUESTIONS.length) * 100);

  // Compute score
  const { score, band, recs } = useMemo(()=>{
    let pts = 0;

    // Access & Basics (25)
    // q1_checking, q2_deposit, q13_language (no score), proxy trust via comfort later
    if (answers["q1_checking"] === "Yes") pts += 12;
    if (answers["q2_deposit"] === "Yes") pts += 10;
    if (answers["q2_deposit"] === "Sometimes") pts += 5;

    // Safety Net & Bills (30)
    // q3_liquidity
    const liq = answers["q3_liquidity"];
    if (liq === ">$500") pts += 12;
    else if (liq === "$100–$500") pts += 9;
    else if (liq === "$1–$100") pts += 4;
    // q4_housing_current
    if (answers["q4_housing_current"] === "Yes") pts += 9;
    // q5_utils_current
    if (answers["q5_utils_current"] === "Yes") pts += 9;

    // Stability (20)
    if (answers["q8_transport"] === "Yes") pts += 7;
    if (answers["q9_connectivity"] === "Yes") pts += 7;
    if (answers["q10_income_timing"] === "Steady") pts += 6;

    // Obligations & Risk (15) – subtractors
    if (answers["q6_highcost"] === "Yes") pts -= 8;
    const coll = answers["q7_collections"];
    if (coll === "Yes") pts -= 7;
    if (coll === "Not sure") pts -= 3;

    // Confidence & Support (10)
    if (answers["q11_set_aside"] === "Yes") pts += 6;
    if (answers["q11_set_aside"] === "Some months") pts += 3;
    if (answers["q12_comfort"] === "Comfortable") pts += 4;

    // Clamp & band
    const s = Math.max(0, Math.min(100, pts));
    const b = bandFor(s);

    // Recommendations (gentle, need-based)
    const rs: Rec[] = [];

    // Basics / Access
    if (answers["q1_checking"] !== "Yes") {
      uniquePush(rs, {
        title: "Open Everyday Checking",
        why: "No surprise fees and direct deposit friendly. We’ll explain terms up front."
      });
    }
    if (answers["q2_deposit"] !== "Yes") {
      uniquePush(rs, {
        title: "Set up Direct Deposit",
        why: "Faster access to pay and fewer check-cashing fees."
      });
    }

    // Safety net
    if (liq === "None" || liq === "$1–$100") {
      uniquePush(rs, {
        title: "Start a $20 Cushion",
        why: "Save $20 per paycheck to reach $200–$300 quickly and avoid fees."
      });
      uniquePush(rs, {
        title: "Cash Cushion (Small-Dollar Loan)",
        why: "Short-term bridge with clear terms and no prepayment penalty."
      });
    }

    // Bills behind
    if (answers["q4_housing_current"] === "No" || answers["q5_utils_current"] === "No") {
      uniquePush(rs, {
        title: "Payment Plan & Hardship Review",
        why: "We’ll call providers together and build a catch-up plan that fits your budget."
      });
    }

    // High-cost obligations
    if (answers["q6_highcost"] === "Yes") {
      uniquePush(rs, {
        title: "Relief Refinance / Pay-down Plan",
        why: "Replace high-cost debt with a lower, fixed payment and a clear payoff date."
      });
    }

    // Collections or unsure
    if (answers["q7_collections"] === "Yes" || answers["q7_collections"] === "Not sure") {
      uniquePush(rs, {
        title: "Credit Report Check",
        why: "We’ll pull free reports and make a step-by-step plan to settle or dispute."
      });
      uniquePush(rs, {
        title: "Pathway Credit Builder",
        why: "Build positive history using a small secured installment—savings stays yours."
      });
    }

    // Stability helpers
    if (answers["q8_transport"] === "No") {
      uniquePush(rs, {
        title: "Reliable Wheels Plan",
        why: "Budget for repairs or find an affordable auto—terms explained clearly."
      });
    }
    if (answers["q9_connectivity"] === "No") {
      uniquePush(rs, {
        title: "Low-Cost Connectivity Tips",
        why: "Free Wi-Fi spots, assistance programs, and phone plans we see work well."
      });
    }

    // Set-aside and comfort
    if (answers["q11_set_aside"] === "No" || answers["q12_comfort"] === "I need help") {
      uniquePush(rs, {
        title: "15-Minute Budget Setup",
        why: "We’ll map bills to paydays and auto-save a few dollars without stress."
      });
    }

    // Language & counselor
    if (answers["q13_language"] === "Español") {
      uniquePush(rs, {
        title: "Recursos en Español",
        why: "Guías simples, ejemplos y apoyo en tu idioma."
      });
    }
    if (answers["q15_counselor"] === "Yes") {
      uniquePush(rs, {
        title: "Meet a Certified Counselor",
        why: "Free and judgment-free. We focus on 2–3 small wins you choose."
      });
    }

    return { score: s, band: b, recs: rs.slice(0, 7) };
  }, [answers]);

  // Navigation
  const canNext = step < QUESTIONS.length - 1;
  const canBack = step > 0;

  const bandTone = band === "Great" ? "text-emerald-600 bg-[rgb(16,185,129,0.12)]" : band === "Okay" ? "text-amber-600 bg-[rgb(217,119,6,0.12)]" : "text-rose-600 bg-[rgb(220,38,38,0.12)]";

  return (
    <Container>
      <div className="space-y-6">
        <div className="card p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="eyebrow">Financial Wellness Check</span>
              <h1 className="mt-2 text-2xl font-semibold text-[color:#0D3554]">Step {step + 1} of {QUESTIONS.length}</h1>
            </div>
            <span className="text-sm text-slate-500">{progressPercent}% complete</span>
          </div>
          <div className="mt-4 space-y-2">
            <Bar value={progressPercent} />
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Question {step + 1}</span>
              <span>{progressPercent}%</span>
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
          <section className="card p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-[color:#0D3554]">{q.label}</h2>
                {q.help ? <p className="mt-2 text-slate-600">{q.help}</p> : null}
              </div>

              {q.kind === "chips" && (
                <div className="flex flex-wrap gap-3">
                  {(q.options || []).map((opt) => {
                    const pressed = answers[q.id] === opt;
                    return <Chip key={opt} label={opt} pressed={!!pressed} onClick={() => setAnswer(q.id, opt)} />;
                  })}
                </div>
              )}

              {q.kind === "number" && (
                <input
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 shadow-soft focus:border-[color:#0E7DB6] focus:outline-none focus:ring-2 focus:ring-[rgb(14,125,182,0.2)] text-[color:#0D3554]"
                  inputMode="decimal"
                  placeholder="Type an amount"
                  value={(answers[q.id] as number | "" | undefined) ?? ""}
                  onChange={(e) => setAnswer(q.id, Number(e.target.value || 0))}
                />
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-4">
                <button
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[color:#0E7DB6]/30 px-6 py-3 text-[color:#0E7DB6] hover:bg-[rgb(14,125,182,0.06)] disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={!canBack}
                >
                  Back
                </button>
                <div className="flex flex-wrap gap-3">
                  {canNext ? (
                    <button
                      className="gradient-btn inline-flex min-h-[44px] items-center justify-center px-6 py-3 font-semibold"
                      onClick={() => setStep((s) => Math.min(QUESTIONS.length - 1, s + 1))}
                    >
                      Next
                    </button>
                  ) : (
                    <a className="gradient-btn inline-flex min-h-[44px] items-center justify-center px-6 py-3 font-semibold" href="#results">
                      See my results
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          <aside id="results" className="card p-6 sm:p-8 mt-6 lg:mt-0">
            <div className="space-y-6">
              <div>
                <span className="eyebrow">Your snapshot</span>
                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold text-[color:#0D3554]">Score</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${bandTone}`}>{band}</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-[color:#0D3554]">{score}</span>
                  <span className="text-slate-500">/ 100</span>
                </div>
                <div className="mt-3 space-y-2">
                  <Bar value={score} />
                  <p className="text-sm text-slate-600">
                    Higher is better. We’ll aim for steady gains with small, doable steps.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[color:#0D3554]">Next steps (no pressure)</h3>
                <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-600">
                  {recs.length === 0 ? (
                    <li>You’re in a good spot. Keep going—we’re here when you need us.</li>
                  ) : (
                    recs.map((r) => (
                      <li key={r.title}>
                        <strong className="text-[color:#0D3554]">{r.title}.</strong> {r.why}
                      </li>
                    ))
                  )}
                </ul>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a className="gradient-btn inline-flex min-h-[44px] items-center justify-center px-6 py-3 font-semibold" href="/products">
                    See options &amp; terms
                  </a>
                  <a
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[color:#0E7DB6]/30 px-6 py-3 text-[color:#0E7DB6] hover:bg-[rgb(14,125,182,0.06)]"
                    href="/learn"
                  >
                    Learn more
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[color:#0D3554]">Your choices</h3>
                <div className="mt-3 space-y-3 text-sm text-slate-600">
                  {QUESTIONS.map((question) => (
                    <div key={question.id} className="flex items-start justify-between gap-3">
                      <span className="text-slate-500">{question.label}</span>
                      <strong className="text-[color:#0D3554]">{answers[question.id] ? String(answers[question.id]) : "—"}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
}
