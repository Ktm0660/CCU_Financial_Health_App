"use client";
import React, {useMemo, useState} from "react";
import {Navbar, SectionTitle, Card, Button, Progress} from "@/components/ui";
import { calcDTI, calcEmergencyMonths, calcSavingsProgress, normalizeTo100, scoreToBand, buildRecommendations } from "@/lib/health";

type Inputs = {
  monthlyIncome: number|null;
  monthlyExpenses: number|null;
  emergencyFund: number|null;
  totalDebtPayments: number|null;
  creditUtilization: number|null; // 0-100
  savingsContributions: number[]; // optional buckets
};
const initial: Inputs = { monthlyIncome:null, monthlyExpenses:null, emergencyFund:null, totalDebtPayments:null, creditUtilization:null, savingsContributions:[] };

export default function StartAssess(){
  const [step,setStep]=useState(0);
  const [v,setV]=useState<Inputs>(initial);
  const canNext = useMemo(()=>{
    if(step===0) return v.monthlyIncome!=null;
    if(step===1) return v.monthlyExpenses!=null;
    if(step===2) return v.emergencyFund!=null;
    if(step===3) return v.totalDebtPayments!=null && v.creditUtilization!=null;
    return true;
  },[step,v]);

  function num(value:string){const n=Number(value);return Number.isFinite(n)?n:0}

  // Compute scores only when complete enough
  const results = useMemo(()=>{
    if(v.monthlyIncome==null || v.monthlyExpenses==null || v.emergencyFund==null || v.totalDebtPayments==null || v.creditUtilization==null){
      return null;
    }
    const dti = calcDTI({monthlyIncome: v.monthlyIncome, totalDebtPayments: v.totalDebtPayments});
    const emerg = calcEmergencyMonths({monthlyExpenses: v.monthlyExpenses, emergencyFund: v.emergencyFund});
    const savings = calcSavingsProgress(v.savingsContributions ?? []);
    const total = normalizeTo100(dti ?? 0, emerg ?? 0, savings ?? 0, v.creditUtilization ?? 0);
    const band = scoreToBand(total);
    const recs = buildRecommendations(dti ?? 0, emerg ?? 0, savings ?? 0, v.creditUtilization ?? 0);
    return {dti, emerg, savings, total, band, recs};
  },[v]);

  return (
    <>
      <Navbar/>
      <main className="container" style={{paddingTop:28,paddingBottom:40}}>
        <SectionTitle eyebrow="Step-by-step" title="Let’s learn about your money" desc="Answer a few questions. We’ll give you a gentle score and 3 concrete next steps."/>
        <Card style={{padding:20, marginBottom:18}}>
          {step===0 && (
            <div>
              <div className="h2">Earn</div>
              <p className="lead">What’s your average monthly take-home pay?</p>
              <input inputMode="numeric" placeholder="e.g., 4200" onChange={(e)=>setV(s=>({...s,monthlyIncome:num(e.target.value)}))} style={field}/>
            </div>
          )}
          {step===1 && (
            <div>
              <div className="h2">Spend</div>
              <p className="lead">About how much do you spend monthly (all bills + life)?</p>
              <input inputMode="numeric" placeholder="e.g., 3500" onChange={(e)=>setV(s=>({...s,monthlyExpenses:num(e.target.value)}))} style={field}/>
            </div>
          )}
          {step===2 && (
            <div>
              <div className="h2">Save</div>
              <p className="lead">How much do you currently have in an emergency fund?</p>
              <input inputMode="numeric" placeholder="e.g., 2000" onChange={(e)=>setV(s=>({...s,emergencyFund:num(e.target.value)}))} style={field}/>
            </div>
          )}
          {step===3 && (
            <div>
              <div className="h2">Borrow</div>
              <p className="lead">Monthly debt payments and estimated credit utilization.</p>
              <label style={label}>Debt payments (monthly)</label>
              <input inputMode="numeric" placeholder="e.g., 600" onChange={(e)=>setV(s=>({...s,totalDebtPayments:num(e.target.value)}))} style={field}/>
              <label style={label}>Credit utilization (%)</label>
              <input inputMode="numeric" placeholder="e.g., 35" onChange={(e)=>setV(s=>({...s,creditUtilization:num(e.target.value)}))} style={field}/>
            </div>
          )}
          {step===4 && (
            <div>
              <div className="h2">Plan</div>
              <p className="lead">Optional: add monthly savings contributions (comma-separated) to goals.</p>
              <input placeholder="e.g., 100, 50, 75" onChange={(e)=>{
                const vals=e.target.value.split(",").map(s=>Number(s.trim())).filter(n=>Number.isFinite(n));
                setV(s=>({...s,savingsContributions:vals}));
              }} style={field}/>
              <p style={{color:"var(--muted)",marginTop:8}}>You can skip this and continue.</p>
            </div>
          )}

          <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"space-between",marginTop:16}}>
            <Button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0} style={{opacity: step===0? .5:1}}>Back</Button>
            {step<4 ? (
              <Button onClick={()=>setStep(s=>s+1)} disabled={!canNext} style={{opacity: !canNext? .6:1}}>Next</Button>
            ) : (
              <Button asLinkHref="#results">See results</Button>
            )}
          </div>
        </Card>

        <div id="results">
          {results ? (
            <Card style={{padding:20}}>
              <div className="h2">Your results</div>
              <div style={{marginTop:10}}>
                <div style={row}><span>Debt-to-Income</span><strong>{Math.round((results.dti??0)*100)/100}</strong></div>
                <div style={row}><span>Emergency months</span><strong>{Math.round((results.emerg??0)*10)/10}</strong></div>
                <div style={row}><span>Savings progress</span><strong>{Math.round((results.savings??0)*100)/100}</strong></div>
                <div style={{margin:"14px 0 6px"}}><strong>Total score</strong></div>
                <Progress value={results.total}/>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
                  <span style={{color:"var(--muted)"}}>Band</span><strong>{results.band}</strong>
                </div>
              </div>
              <div style={{marginTop:16}}>
                <div className="h2" style={{fontSize:18}}>Recommended next steps</div>
                <ul style={{marginTop:8,color:"var(--muted)"}}>
                  {results.recs.slice(0,3).map((r:string,i:number)=>(<li key={i}>• {r}</li>))}
                </ul>
              </div>
            </Card>
          ) : (
            <p className="lead">Complete the steps to see your results.</p>
          )}
        </div>
      </main>
    </>
  );
}

const field:React.CSSProperties={width:"100%",padding:"12px 14px",borderRadius:12,border:"1px solid #e5e7eb",outline:"none",boxShadow:"0 0 0 0 var(--ring)"};
const label:React.CSSProperties={display:"block",margin:"8px 0 6px",fontWeight:600};
const row:React.CSSProperties={display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #f1f5f9"};
