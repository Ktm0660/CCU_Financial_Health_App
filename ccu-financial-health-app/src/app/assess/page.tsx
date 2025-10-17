"use client";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-client";
import { useMemo, useState } from "react";

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
    <button type="button" className="btn-chip" aria-pressed={pressed} onClick={onClick}>
      {label}
    </button>
  );
}

function Meter({value}:{value:number}) {
  return (
    <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <span style={{width:`${value}%`}} />
    </div>
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
  useLocale();
  const [step, setStep] = useState(0); // index into QUESTIONS
  const [answers, setAnswers] = useState<Record<string, ChipVal | number | null>>({});

  const q = QUESTIONS[step];

  function setAnswer(id:string, val:ChipVal | number) {
    setAnswers(prev => ({...prev, [id]: val}));
  }

  const progressPct = Math.round(((step) / QUESTIONS.length) * 100);

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

  return (
    <div className="grid-auto">
      {/* LEFT: Question card */}
      <section className="card card-pad">
        <div className="stack-lg">
          <div className="card-head">{t("assess.title")}</div>
          <div className="rule-accent"></div>

          <div className="stack">
            <div className="kv">
              <span className="muted">Step {step+1} of {QUESTIONS.length}</span>
              <span className="muted">{progressPct}%</span>
            </div>
            <Meter value={progressPct} />
          </div>

          <div className="stack">
            <h2 className="h2" style={{marginBottom:'.25rem'}}>{q.label}</h2>
            {q.help ? <p className="muted" style={{marginTop:0}}>{q.help}</p> : null}

            {q.kind === "chips" && (
              <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',marginTop:'.5rem'}}>
                {(q.options||[]).map(opt=>{
                  const pressed = answers[q.id] === opt;
                  return <Chip key={opt} label={opt} pressed={!!pressed} onClick={()=>setAnswer(q.id, opt)} />;
                })}
              </div>
            )}

            {q.kind === "number" && (
              <input
                className="input"
                inputMode="decimal"
                placeholder="Type an amount"
                value={(answers[q.id] as number | "" | undefined) ?? ""}
                onChange={(e)=>setAnswer(q.id, Number(e.target.value || 0))}
              />
            )}
          </div>

          <div className="kv" style={{marginTop:'1.25rem'}}>
            <button className="btn btn-subtle" onClick={()=> setStep(s=> Math.max(0, s-1))} disabled={!canBack}>Back</button>
            <div style={{display:'flex',gap:'.5rem'}}>
              {canNext ? (
                <button className="btn btn-primary" onClick={()=> setStep(s=> Math.min(QUESTIONS.length-1, s+1))}>
                  {step === 0 ? t("assess.start") : t("assess.next")}
                </button>
              ) : (
                <a className="btn btn-primary" href="#results">{t("assess.submit")}</a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT: Results */}
      <aside id="results" className="card card-pad">
        <div className="stack-lg">
          <div className="card-head">{t("assess.result.title")}</div>

          <div className="stack">
            <div className="kv">
              <h3 className="h2" style={{margin:0}}>Score</h3>
              <span className={`badge ${band==="Great"?"badge-ok":band==="Okay"?"badge-warn":"badge-bad"}`}>{band}</span>
            </div>
            <div className="kv" style={{alignItems:'baseline'}}>
              <strong style={{fontSize:'2.25rem',color:'var(--brand-navy)'}}>{score}</strong>
              <span className="muted"> / 100</span>
            </div>
            <Meter value={score} />
            <p className="muted" style={{fontSize:'.94rem'}}>
              Higher is better. We’ll aim for steady gains with small, doable steps.
            </p>
          </div>

          <div className="rule-accent"></div>

          <div className="stack">
            <h3 className="h3">Next steps (no pressure)</h3>
            <ul style={{paddingLeft:'1.2rem',lineHeight:'1.7'}}>
              {recs.length===0 ? (
                <li>You’re in a good spot. Keep going—we’re here when you need us.</li>
              ) : (
                recs.map(r=> <li key={r.title}><strong>{r.title}.</strong> <span className="muted">{r.why}</span></li>)
              )}
            </ul>

            <div style={{display:'flex',flexWrap:'wrap',gap:'.5rem'}}>
              <a className="btn btn-primary" href="/products">{t("assess.result.cta")}</a>
              <a className="btn btn-subtle" href="/learn">Learn more</a>
            </div>
          </div>

          <div className="rule-accent"></div>

          <div className="stack">
            <h3 className="h3">Your choices</h3>
            <div className="stack-sm">
              {QUESTIONS.map(q => (
                <div key={q.id} className="kv">
                  <span className="muted">{q.label}</span>
                  <strong>{answers[q.id] ? String(answers[q.id]) : "—"}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
