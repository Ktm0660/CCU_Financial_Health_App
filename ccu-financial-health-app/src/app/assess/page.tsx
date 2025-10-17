"use client";
import { useMemo, useState, ChangeEvent, useEffect } from "react";
import Card from "@/components/Card";
import Link from "next/link";

type Q = { id:string; type:"yn"|"scale"; en:string; es:string; min?:number; max?:number; step?:number; };

const Qs:Q[] = [
  {id:"budget", type:"yn", en:"Do you use a simple monthly plan (budget)?", es:"¿Usa un plan mensual sencillo (presupuesto)?"},
  {id:"safety", type:"yn", en:"Could you cover a $400 surprise without borrowing?", es:"¿Puede cubrir un gasto sorpresa de $400 sin pedir prestado?"},
  {id:"rent", type:"yn", en:"Is rent/mortgage under 30% of take-home pay?", es:"¿La renta/hipoteca es menos del 30% de su ingreso neto?"},
  {id:"transport", type:"yn", en:"Is car/transport under 15% of take-home pay?", es:"¿El transporte es menos del 15% de su ingreso neto?"},
  {id:"late", type:"yn", en:"Any late/NSF fees in the last 3 months?", es:"¿Tuvo cargos por pago tardío/NSF en 3 meses?"},
  {id:"auto_save", type:"yn", en:"Do you save automatically each payday?", es:"¿Ahorra automáticamente cada día de pago?"},
  {id:"know_score", type:"yn", en:"Do you know your credit score range?", es:"¿Conoce su rango de puntaje crediticio?"},
  {id:"income_stable", type:"yn", en:"Is your income amount similar each month?", es:"¿Su ingreso es similar cada mes?"},
  {id:"debt_stress", type:"scale", en:"How stressed do debts make you? (0 none – 5 high)", es:"¿Qué tanto estrés le causan las deudas? (0 nada – 5 alto)", min:0, max:5, step:1},
  {id:"ready_goal", type:"yn", en:"Ready to pick one small goal today?", es:"¿Listo para elegir una meta pequeña hoy?"},
  {id:"banked", type:"yn", en:"Do you have a checking account today?", es:"¿Tiene una cuenta de cheques hoy?"},
  {id:"emergency", type:"yn", en:"Do you have at least $100 set aside for emergencies?", es:"¿Tiene al menos $100 guardados para emergencias?"},
];

function ynScore(v:string){ return v==="yes"?1:v==="no"?0:0.5; }
function clamp(n:number,min:number,max:number){ return Math.max(min, Math.min(max,n)); }

export default function Assess(){
  const [lang,setLang]=useState<"en"|"es">("en");
  useEffect(()=>{ const s=typeof window!=="undefined"&&localStorage.getItem("ccu_lang")==="es"; setLang(s?"es":"en"); },[]);
  const [a,setA]=useState<Record<string,string>>({});
  const set=(id:string)=>(e:ChangeEvent<HTMLInputElement>)=> setA(x=>({...x,[id]:e.target.value}));

  const score = useMemo(()=>{
    let pts=0, total=Qs.length;
    for(const q of Qs){
      const v=a[q.id];
      if(!v) continue;
      if(q.type==="yn") pts+=ynScore(v);
      if(q.type==="scale"){
        const num=parseFloat(v);
        const frac=1-(clamp(num,q.min??0,q.max??5)/(q.max??5)); // lower stress = better
        pts+=frac;
      }
    }
    return Math.round((pts/total)*100);
  },[a]);

  const band = score>=80?"Strong":score>=60?"Steady":score>=40?"Getting Started":"Urgent Support";

  const recs = useMemo(()=>{
    const r:string[]=[];
    if(a.budget!=="yes") r.push("Make a 10-minute plan: Needs, Goals, Fun.");
    if(a.safety!=="yes") r.push("Open Savings and turn on $10 auto-transfer.");
    if(a.late==="yes") r.push("Turn on alerts + set due dates to pay on time.");
    if(a.auto_save!=="yes") r.push("Enable automatic savings or round-up.");
    if(a.know_score!=="yes") r.push("Check your credit score and set a goal band.");
    if(a.banked!=="yes") r.push("Open Free Checking to avoid check-cashers.");
    if(a.emergency!=="yes") r.push("Build $100 safety cushion with round-ups.");
    if(Number(a.debt_stress)>=3) r.push("Consider Credit Builder or a payoff plan.");
    return r.slice(0,6);
  },[a]);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--ink)]">{lang==="es"?"Chequeo financiero":"Financial Checkup"}</h1>
          <p className="text-[var(--ink-2)]">{lang==="es"?"12 preguntas sencillas. Recomendaciones claras.":"12 simple questions. Clear, judgment-free next steps."}</p>
        </div>
        <button onClick={()=>setLang(p=>{const nx=p==="en"?"es":"en"; if(typeof window!=="undefined") localStorage.setItem("ccu_lang",nx==="es"?"es":"en"); return nx;})}
          className="rounded-md border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink-2)] hover:bg-[var(--bg)]">
          {lang==="es"?"ESPAÑOL ✓":"ESPAÑOL"}
        </button>
      </div>

      <Card className="p-6">
        <div className="grid gap-6">
          {Qs.map(q=>(
            <div key={q.id} className="border-b last:border-none border-[var(--line)] pb-4">
              <p className="font-medium text-[var(--ink)]">{lang==="es"?q.es:q.en}</p>
              {q.type==="yn" && (
                <div className="mt-2 flex gap-3">
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name={q.id} value="yes" onChange={set(q.id)} className="h-4 w-4"/> <span>{lang==="es"?"Sí":"Yes"}</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name={q.id} value="no" onChange={set(q.id)} className="h-4 w-4"/> <span>{lang==="es"?"No":"No"}</span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name={q.id} value="unsure" onChange={set(q.id)} className="h-4 w-4"/> <span>{lang==="es"?"No seguro":"Unsure"}</span>
                  </label>
                </div>
              )}
              {q.type==="scale" && (
                <div className="mt-2">
                  <input type="range" min={q.min??0} max={q.max??5} step={q.step??1} onChange={set(q.id)} className="w-full accent-[var(--accent)]"/>
                  <div className="flex justify-between text-xs text-[var(--ink-2)]"><span>{lang==="es"?"Bajo":"Low"}</span><span>{lang==="es"?"Alto":"High"}</span></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-[var(--ink-2)]">{lang==="es"?"Puntaje aproximado":"Approximate score"}</p>
          <p className="mt-1 text-4xl font-extrabold text-[var(--ink)]">{score}</p>
          <p className="mt-1 text-sm font-semibold text-[var(--accent)]">{band}</p>
        </Card>
        <Card className="p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-[var(--ink)]">{lang==="es"?"Siguientes pasos sugeridos":"Suggested next steps"}</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-[var(--ink-2)]">
            {recs.length?recs.map((r,i)=>(<li key={i}>{r}</li>)):<li>{lang==="es"?"Responda algunas preguntas para ver recomendaciones.":"Answer a few questions to see recommendations."}</li>}
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/products" className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--bg)]">
              {lang==="es"?"Ver productos que ayudan":"See products that help"}
            </Link>
            <a href="https://www.connectidaho.org/" className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-700)]">
              {lang==="es"?"Hablar con un asesor":"Talk to a counselor"}
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
