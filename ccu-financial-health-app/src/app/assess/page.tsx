"use client";
import { useMemo, useState } from "react";

type ScoreBand = "Great" | "Okay" | "Needs attention";
function bandFor(score:number): ScoreBand {
  if (score >= 75) return "Great";
  if (score >= 50) return "Okay";
  return "Needs attention";
}

export default function Assess() {
  const [income, setIncome] = useState<number | "">("");
  const [rent, setRent] = useState<number | "">("");
  const [debt, setDebt] = useState<number | "">("");
  const [savings, setSavings] = useState<number | "">("");
  const [payTiming, setPayTiming] = useState("steady"); // steady | uneven
  const [emergency, setEmergency] = useState("no");     // yes | no

  const score = useMemo(() => {
    const i = typeof income === "number" ? income : 0;
    const r = typeof rent === "number" ? rent : 0;
    const d = typeof debt === "number" ? debt : 0;
    const s = typeof savings === "number" ? savings : 0;

    let raw = 0;
    raw += i > 0 ? Math.max(0, 35 - (r / i) * 100) : 0; // housing
    raw += i > 0 ? Math.max(0, 30 - (d / i) * 100) : 0; // debt payments
    raw += Math.min(35, (s / (i || 1)) * 100);          // savings
    if (payTiming === "steady") raw += 5;
    if (emergency === "yes") raw += 5;

    return Math.max(0, Math.min(100, Math.round(raw)));
  }, [income, rent, debt, savings, payTiming, emergency]);

  const band = bandFor(score);

  return (
    <div className="grid-auto">
      {/* Left: form */}
      <section className="card card-pad shadow-hover">
        <div className="stack-lg">
          <div className="kv">
            <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
              <span className="icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M4 7h16M4 12h16M4 17h10" stroke="var(--brand-blue)" strokeWidth="1.8"/>
                </svg>
              </span>
              <h1 className="h2" style={{margin:0}}>Financial Checkup</h1>
            </div>
            <span className="badge badge-ok">Private</span>
          </div>
          <p className="muted">A short, judgment-free snapshot. We don’t store answers here.</p>

          <div className="stack">
            <label className="label">Monthly take-home pay</label>
            <input className="input" inputMode="decimal" placeholder="e.g. 3200"
                   value={income} onChange={(e)=> setIncome(e.target.value === "" ? "" : Number(e.target.value))}/>
            <span className="muted" style={{fontSize:'.9rem'}}>What lands in your account after taxes and deductions.</span>
          </div>

          <div className="stack">
            <label className="label">Monthly housing payment</label>
            <input className="input" inputMode="decimal" placeholder="Rent or mortgage"
                   value={rent} onChange={(e)=> setRent(e.target.value === "" ? "" : Number(e.target.value))}/>
          </div>

          <div className="stack">
            <label className="label">Monthly debt payments (credit cards, loans)</label>
            <input className="input" inputMode="decimal" placeholder="Total minimums due"
                   value={debt} onChange={(e)=> setDebt(e.target.value === "" ? "" : Number(e.target.value))}/>
          </div>

          <div className="stack">
            <label className="label">Savings today</label>
            <input className="input" inputMode="decimal" placeholder="Cash you can use if needed"
                   value={savings} onChange={(e)=> setSavings(e.target.value === "" ? "" : Number(e.target.value))}/>
          </div>

          <div className="stack">
            <span className="label">Pay schedule</span>
            <label className="tile"><input type="radio" name="pay" checked={payTiming==="steady"} onChange={()=>setPayTiming("steady")}/> <span>Steady (same days/amounts)</span></label>
            <label className="tile"><input type="radio" name="pay" checked={payTiming==="uneven"} onChange={()=>setPayTiming("uneven")}/> <span>Uneven (varies week to week)</span></label>
          </div>

          <div className="stack">
            <span className="label">Could you borrow from someone in an emergency?</span>
            <label className="tile"><input type="radio" name="em" checked={emergency==="yes"} onChange={()=>setEmergency("yes")}/> <span>Yes</span></label>
            <label className="tile"><input type="radio" name="em" checked={emergency==="no"} onChange={()=>setEmergency("no")}/> <span>No</span></label>
          </div>
        </div>
      </section>

      {/* Right: results */}
      <aside className="card card-pad shadow-hover">
        <div className="stack-lg">
          <div className="kv">
            <h2 className="h2" style={{margin:0}}>Your snapshot</h2>
            <span className={`badge ${band==="Great"?"badge-ok":band==="Okay"?"badge-warn":"badge-bad"}`}>{band}</span>
          </div>

          <div className="stack-sm">
            <div className="kv">
              <strong>Score</strong>
              <strong style={{fontSize:'2rem',color:'var(--brand-navy)'}}>{score}</strong>
            </div>
            <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={score}>
              <span style={{width:`${score}%`}} />
            </div>
            <p className="muted" style={{fontSize:'.92rem'}}>Higher is better. We’ll aim to gently nudge this up over time.</p>
          </div>

          <div className="hr"></div>

          <div className="stack">
            <h3 className="h3">What to do next</h3>
            <ul className="muted" style={{paddingLeft:'1.2rem',lineHeight:'1.65'}}>
              <li>Try to keep housing near 35% of income.</li>
              <li>Autopay at least minimums to avoid fees.</li>
              <li>Build a small cushion ($20–$50 per paycheck).</li>
            </ul>
            <a className="btn btn-subtle" href="/products">See low-cost products &amp; terms</a>
          </div>

          <div className="hr"></div>

          <div className="stack">
            <h3 className="h3">Your quick facts</h3>
            <div className="stack-sm">
              <div className="kv"><span className="muted">Housing ÷ Income</span><strong>{typeof income==="number" && income>0 ? Math.round((Number(rent||0)/income)*100) : 0}%</strong></div>
              <div className="kv"><span className="muted">Debt ÷ Income</span><strong>{typeof income==="number" && income>0 ? Math.round((Number(debt||0)/income)*100) : 0}%</strong></div>
              <div className="kv"><span className="muted">Savings ÷ Income</span><strong>{typeof income==="number" && income>0 ? Math.round((Number(savings||0)/income)*100) : 0}%</strong></div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
