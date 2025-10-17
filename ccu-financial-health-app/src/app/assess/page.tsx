"use client";
import { useState } from "react";
import { Card, Button, Field, SectionTitle } from "@/components/ui";
import { t } from "@/lib/i18n";

const qs=[
  {id:"income",   label:"Monthly take-home pay",         hint:"Your usual deposit after taxes."},
  {id:"needs",    label:"Monthly expenses (needs)",      hint:"Housing, food, utilities, transport."},
  {id:"debt",     label:"Total monthly debt payments",   hint:"Loans, credit cards, etc."},
  {id:"savings",  label:"Emergency savings ($)",         hint:"What you could use in a pinch."},
  {id:"util",     label:"Credit card utilization %",     hint:"Used balance ÷ limit × 100."},
];

export default function Assess(){
  const [step,setStep]=useState(0);
  const [a,setA]=useState<Record<string,number>>({});
  const [score,setScore]=useState<number|null>(null);

  function onChange(id:string,v:string){
    const n=Number(v.replace(/[^0-9.]/g,""));
    setA(s=>({...s,[id]:Number.isFinite(n)?n:0}));
  }
  function finish(){
    const income=a.income||0, needs=a.needs||0, debt=a.debt||0, savings=a.savings||0, util=Math.min(100,Math.max(0,a.util||0));
    const dti=income?Math.min(100,((debt+needs)/Math.max(1,income))*100):100;
    const months=needs?Math.min(6,savings/needs):0;
    const raw=(100-Math.min(100,dti))*0.45 + Math.min(100,months*(100/6))*0.35 + (100-util)*0.20;
    setScore(Math.round(Math.max(1,Math.min(100,raw))));
    setStep(qs.length+1);
  }

  return (
    <section className="space-y-6">
      <SectionTitle kicker="Step-by-step">{t("assess.title")}</SectionTitle>

      {step===0 && (
        <Card className="p-6">
          <p className="text-[var(--sub)]">Answer a few quick questions in plain language. We’ll show gentle next steps—no judgments.</p>
          <div className="mt-6"><Button onClick={()=>setStep(1)}>{t("assess.start")}</Button></div>
        </Card>
      )}

      {step>0 && step<=qs.length && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-[var(--sub)]">Question {step} of {qs.length}</div>
            <div className="h-2 w-40 rounded bg-[var(--line)]">
              <div className="h-2 rounded bg-[var(--accent)] transition-[width]" style={{width:`${(step/qs.length)*100}%`}} />
            </div>
          </div>
          <Field label={qs[step-1].label} hint={qs[step-1].hint} inputMode="decimal" onChange={(e)=>onChange(qs[step-1].id,e.target.value)} />
          <div className="mt-6 flex flex-wrap gap-3">
            {step>1 && <Button variant="outline" onClick={()=>setStep(step-1)}>Back</Button>}
            {step<qs.length && <Button onClick={()=>setStep(step+1)}>{t("assess.next")}</Button>}
            {step===qs.length && <Button onClick={finish}>{t("assess.submit")}</Button>}
          </div>
        </Card>
      )}

      {step===qs.length+1 && score!==null && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Your starting point</h2>
            <div className="mt-4 rounded-xl border border-[var(--line)] bg-white p-6 text-center">
              <div className="text-sm uppercase tracking-wide text-[var(--sub)]">Wellness Score</div>
              <div className="mt-2 text-5xl font-semibold">{score}</div>
              <div className="mt-2 text-sm text-[var(--sub)]">Higher is better (1–100)</div>
            </div>
          </Card>
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold">Next steps</h3>
            <ul className="mt-3 space-y-2 text-[var(--sub)]">
              <li>• If expenses + debt &gt;60% of income, let’s review a spending plan.</li>
              <li>• Aim for 1–3 months of expenses in savings; consider auto-transfer.</li>
              <li>• Keep card use under 30% of limit; ask about balance transfer tools.</li>
              <li>• See transparent products tailored to your answers.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/products"><Button>Explore Products</Button></a>
              <a href="/resources"><Button variant="outline">Resource Center</Button></a>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}
