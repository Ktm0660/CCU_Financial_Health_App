"use client";
import { useMemo, useState } from "react";

/**
 * New super-simple 6-question flow.
 * 1) Pay timing: steady / uneven
 * 2) Income range (tap chip)
 * 3) Housing type (rent / own / with family) + quick amount if rent/own
 * 4) Monthly debt payments (chip or number)
 * 5) Savings today (chip or number)
 * 6) Confidence / stress (chip)
 *
 * Score = weighted blend (0–100). Recs map to answers with plain-language reasons.
 */

type Band = "Great" | "Okay" | "Needs attention";
function bandFor(score:number): Band {
  if (score >= 75) return "Great";
  if (score >= 50) return "Okay";
  return "Needs attention";
}

function Chip({label, pressed, onClick}:{label:string; pressed:boolean; onClick:()=>void}) {
  return <button type="button" className="btn-chip" aria-pressed={pressed} onClick={onClick}>{label}</button>;
}

export default function Assess() {
  // Q1 Pay timing
  const [payTiming, setPayTiming] = useState<"steady" | "uneven">("steady");

  // Q2 Income range (monthly take-home)
  const incomeOptions = ["< $2k","$2k–$3k","$3k–$4k","$4k–$6k",">$6k"] as const;
  type IncomeOpt = typeof incomeOptions[number];
  const [incomeRange, setIncomeRange] = useState<IncomeOpt | null>(null);
  const incomeMid = useMemo(()=>({
    "< $2k":1500, "$2k–$3k":2500, "$3k–$4k":3500, "$4k–$6k":5000, ">$6k":7000
  } as Record<IncomeOpt, number>),[]);

  // Q3 Housing
  const [housing, setHousing] = useState<"rent"|"own"|"family"|null>(null);
  const [housingAmt, setHousingAmt] = useState<string>(""); // optional

  // Q4 Debt payments
  const debtOptions = ["$0–$100","$100–$300","$300–$600",">$600"] as const;
  type DebtOpt = typeof debtOptions[number];
  const [debtRange, setDebtRange] = useState<DebtOpt | null>(null);
  const [debtAmt, setDebtAmt] = useState<string>(""); // optional manual

  // Q5 Savings
  const saveOptions = ["$0","$1–$500","$500–$2k",">$2k"] as const;
  type SaveOpt = typeof saveOptions[number];
  const [saveRange, setSaveRange] = useState<SaveOpt | null>(null);
  const [saveAmt, setSaveAmt] = useState<string>("");

  // Q6 Confidence (self-report)
  const confidenceOpts = ["Calm","Managing","Stressed"] as const;
  type ConfOpt = typeof confidenceOpts[number];
  const [confidence, setConfidence] = useState<ConfOpt | null>(null);

  // Numeric rollups
  const income = incomeRange ? incomeMid[incomeRange] : 0;
  const housingNum = Number(housingAmt || 0);
  const debtNum = debtRange ? (
    debtRange==="$0–$100"?100:
    debtRange==="$100–$300"?300:
    debtRange==="$300–$600"?600:800
  ) : Number(debtAmt || 0);
  const saveNum = saveRange ? (
    saveRange==="$0"?0:
    saveRange==="$1–$500"?500:
    saveRange==="$500–$2k"?2000:4000
  ) : Number(saveAmt || 0);

  // Score
  const score = useMemo(()=>{
    let raw = 0;
    // Housing affordability (35% target)
    if (housing === "family") {
      raw += 28;
    } else if (income > 0) {
      const h = housingNum;
      const pct = (h / income) * 100;
      raw += Math.max(0, 35 - Math.min(100, pct)); // 0..35
    }

    // Debt load (30% target of income)
    if (income > 0) {
      const pct = (debtNum / income) * 100;
      raw += Math.max(0, 30 - Math.min(100, pct)); // 0..30
    }

    // Savings cushion (0..30 scaled vs income)
    if (income > 0) {
      raw += Math.min(30, (saveNum / income) * 100);
    }

    // Stability bonuses (5 total)
    if (payTiming === "steady") raw += 3;
    if (confidence === "Calm") raw += 2;
    if (confidence === "Managing") raw += 1;

    return Math.max(0, Math.min(100, Math.round(raw)));
  },[housing, housingNum, income, debtNum, saveNum, payTiming, confidence]);

  const band = bandFor(score);

  // Recommendations (plain language + gentle suggestions)
  const recs = useMemo(()=>{
    const list: {title:string; why:string}[] = [];

    // Liquidity
    if (saveNum < 300) {
      list.push({
        title: "Build a small cash cushion",
        why: "A little buffer ($20–$50 per paycheck) reduces fees and stress."
      });
    }

    // Housing
    if (housing !== "family" && income>0 && (housingNum/income) > 0.4) {
      list.push({
        title: "Lower housing costs over time",
        why: "Aim near 35% of take-home pay. We can brainstorm steps together."
      });
    }

    // Debt
    if (income>0 && (debtNum/income) > 0.3) {
      list.push({
        title: "Tighten debt payments",
        why: "Keeping minimums on autopay avoids fees; snowball what you can."
      });
    }

    // Confidence
    if (confidence === "Stressed") {
      list.push({
        title: "Talk with a counselor (free)",
        why: "Judgment-free planning. We’ll map 2–3 small wins first."
      });
    }

    // Product bridges (non-salesy)
    // Use gentle, transparent language tied to needs.
    if (saveNum < 300) {
      list.push({
        title: "Cash Cushion (Small-Dollar Loan)",
        why: "Short-term option with clear terms and no prepay penalty."
      });
    }
    if (debtNum > 400) {
      list.push({
        title: "Pathway Credit Builder",
        why: "Build payment history at a low rate with savings as collateral."
      });
    }
    if (payTiming === "uneven") {
      list.push({
        title: "Everyday Checking",
        why: "Direct deposit friendly. Overdraft options explained up front."
      });
    }

    return list.slice(0, 6);
  },[saveNum, housing, income, housingNum, debtNum, payTiming, confidence]);

  return (
    <div className="grid-auto">
      {/* LEFT: Questions */}
      <section className="card card-pad">
        <div className="stack-lg">
          <div className="card-head">Quick Checkup</div>
          <div className="rule-accent"></div>
          <p className="muted" style={{marginTop:'.6rem'}}>Plain language. No judgments. Most folks finish in under 2 minutes.</p>

          {/* Q1 */}
          <div className="stack">
            <span className="label">1) Your pay schedule</span>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
              <Chip label="Steady" pressed={payTiming==="steady"} onClick={()=>setPayTiming("steady")} />
              <Chip label="Uneven" pressed={payTiming==="uneven"} onClick={()=>setPayTiming("uneven")} />
            </div>
          </div>

          {/* Q2 */}
          <div className="stack">
            <span className="label">2) Monthly take-home income</span>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
              {incomeOptions.map(o=>
                <Chip key={o} label={o} pressed={incomeRange===o} onClick={()=>setIncomeRange(o)} />
              )}
            </div>
          </div>

          {/* Q3 */}
          <div className="stack">
            <span className="label">3) Housing</span>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',marginBottom:'.5rem'}}>
              <Chip label="Rent" pressed={housing==="rent"} onClick={()=>setHousing("rent")} />
              <Chip label="Own" pressed={housing==="own"} onClick={()=>setHousing("own")} />
              <Chip label="With family" pressed={housing==="family"} onClick={()=>{setHousing("family");setHousingAmt("");}} />
            </div>
            {housing!=="family" && housing!==null && (
              <input className="input" inputMode="decimal" placeholder="Monthly housing amount"
                     value={housingAmt} onChange={(e)=>setHousingAmt(e.target.value)}/>
            )}
          </div>

          {/* Q4 */}
          <div className="stack">
            <span className="label">4) Monthly debt payments</span>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',marginBottom:'.5rem'}}>
              {debtOptions.map(o=>
                <Chip key={o} label={o} pressed={debtRange===o} onClick={()=>{setDebtRange(o);setDebtAmt("");}} />
              )}
            </div>
            <input className="input" inputMode="decimal" placeholder="Or type amount"
                   value={debtAmt} onChange={(e)=>{setDebtAmt(e.target.value);setDebtRange(null);}} />
          </div>

          {/* Q5 */}
          <div className="stack">
            <span className="label">5) Savings available today</span>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',marginBottom:'.5rem'}}>
              {saveOptions.map(o=>
                <Chip key={o} label={o} pressed={saveRange===o} onClick={()=>{setSaveRange(o);setSaveAmt("");}} />
              )}
            </div>
            <input className="input" inputMode="decimal" placeholder="Or type amount"
                   value={saveAmt} onChange={(e)=>{setSaveAmt(e.target.value);setSaveRange(null);}} />
          </div>

          {/* Q6 */}
          <div className="stack">
            <span className="label">6) How does money feel right now?</span>
            <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
              {confidenceOpts.map(o=>
                <Chip key={o} label={o} pressed={confidence===o} onClick={()=>setConfidence(o)} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT: Results */}
      <aside className="card card-pad">
        <div className="stack-lg">
          <div className="card-head">Your Snapshot</div>
          <div className="stack">
            <div className="kv">
              <h2 className="h2" style={{margin:0}}>Score</h2>
              <span className={`badge ${band==="Great"?"badge-ok":band==="Okay"?"badge-warn":"badge-bad"}`}>{band}</span>
            </div>
            <div className="kv" style={{alignItems:'baseline'}}>
              <strong style={{fontSize:'2.25rem',color:'var(--brand-navy)'}}>{score}</strong>
              <span className="muted"> / 100</span>
            </div>
            <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={score}>
              <span style={{width:`${score}%`}} />
            </div>
            <p className="muted" style={{fontSize:'.94rem'}}>We’ll aim for small, steady gains. Higher is better.</p>
          </div>

          <div className="rule-accent"></div>

          <div className="stack">
            <h3 className="h3">Quick facts</h3>
            <div className="stack-sm">
              <div className="kv"><span className="muted">Income (mid-point)</span><strong>${income.toLocaleString()}</strong></div>
              <div className="kv"><span className="muted">Housing ÷ Income</span><strong>{income>0?Math.round((Number(housingNum||0)/income)*100):0}%</strong></div>
              <div className="kv"><span className="muted">Debt ÷ Income</span><strong>{income>0?Math.round((Number(debtNum||0)/income)*100):0}%</strong></div>
              <div className="kv"><span className="muted">Savings ÷ Income</span><strong>{income>0?Math.round((Number(saveNum||0)/income)*100):0}%</strong></div>
            </div>
          </div>

          <div className="rule-accent"></div>

          <div className="stack">
            <h3 className="h3">Next steps (no pressure)</h3>
            <ul style={{paddingLeft:'1.2rem',lineHeight:'1.7'}}>
              {recs.length===0 ? <li>Looks good—keep doing what works. We’re here when you need us.</li> :
                recs.map(r=> <li key={r.title}><strong>{r.title}.</strong> <span className="muted">{r.why}</span></li>)
              }
            </ul>
            <a className="btn btn-primary" href="/products">See options &amp; terms</a>
            <a className="btn btn-subtle" href="/learn" style={{marginLeft:'.5rem'}}>Learn more</a>
          </div>
        </div>
      </aside>
    </div>
  );
}
