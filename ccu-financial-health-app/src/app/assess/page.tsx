'use client';
import { useMemo, useState } from 'react';
import { toNum, calcDTI, calcEmergencyMonths, calcSavingsProgress, normalizeTo100, scoreToBand, buildRecommendations } from '@/lib/health';

type Answers = {
  monthlyIncome: string;
  monthlyDebt: string;
  monthlyExpenses: string;
  emergencyFund: string;
  creditUtilization: string;
  savings1: string;
  savings2: string;
  savings3: string;
};

const initial: Answers = {
  monthlyIncome: '',
  monthlyDebt: '',
  monthlyExpenses: '',
  emergencyFund: '',
  creditUtilization: '',
  savings1: '',
  savings2: '',
  savings3: '',
};

export default function AssessPage() {
  const [a, setA] = useState<Answers>(initial);

  const metrics = useMemo(() => {
    const income = toNum(a.monthlyIncome);
    const debt = toNum(a.monthlyDebt);
    const expenses = toNum(a.monthlyExpenses);
    const fund = toNum(a.emergencyFund);
    const util = Math.max(0, Math.min(100, toNum(a.creditUtilization) ?? 0));

    const dti = calcDTI(debt, income); // 0..100 (higher=worse)
    const monthsEmergency = calcEmergencyMonths({ monthlyExpenses: expenses, emergencyFund: fund }); // 0..12
    const savingsMomentum = calcSavingsProgress(
      [toNum(a.savings1) ?? 0, toNum(a.savings2) ?? 0, toNum(a.savings3) ?? 0]
    ); // 0..100

    const goodDTI = 100 - dti; // re-orient so high=good
    const monthsScore = Math.round(Math.min(100, (monthsEmergency / 6) * 100)); // 6 months -> 100
    const score = normalizeTo100(goodDTI, monthsScore, savingsMomentum, 100 - util);
    const band = scoreToBand(score);
    const recs = buildRecommendations({
      dti,
      monthsEmergency,
      savingsMomentum,
      creditUtilization: util,
    });
    return { dti, monthsEmergency, savingsMomentum, util, score, band, recs };
  }, [a]);

  function onChange<K extends keyof Answers>(key: K, val: string) {
    setA(prev => ({ ...prev, [key]: val }));
  }

  return (
    <section>
      <h1 className="h1">3-Minute Check-In</h1>
      <p className="lede">No judgment. Just a clear snapshot and small next steps you can actually use.</p>

      <div className="grid">
        <div className="card">
          <h3>Income & payments</h3>
          <div className="field">
            <label>Monthly take-home pay</label>
            <input className="input" placeholder="e.g. 3200" inputMode="decimal"
              value={a.monthlyIncome} onChange={e=>onChange('monthlyIncome', e.target.value)} />
            <div className="help">After taxes and typical deductions.</div>
          </div>
          <div className="field">
            <label>Monthly debt payments</label>
            <input className="input" placeholder="Loans + credit cards" inputMode="decimal"
              value={a.monthlyDebt} onChange={e=>onChange('monthlyDebt', e.target.value)} />
            <div className="help">Total minimums due this month.</div>
          </div>
        </div>

        <div className="card">
          <h3>Safety cushion</h3>
          <div className="field">
            <label>Monthly essential expenses</label>
            <input className="input" placeholder="Rent, food, utilities…" inputMode="decimal"
              value={a.monthlyExpenses} onChange={e=>onChange('monthlyExpenses', e.target.value)} />
          </div>
          <div className="field">
            <label>Emergency savings right now</label>
            <input className="input" placeholder="How much could you use in a pinch?" inputMode="decimal"
              value={a.emergencyFund} onChange={e=>onChange('emergencyFund', e.target.value)} />
          </div>
        </div>

        <div className="card">
          <h3>Credit & savings momentum</h3>
          <div className="field">
            <label>Credit card utilization %</label>
            <input className="input" placeholder="0–100" inputMode="decimal"
              value={a.creditUtilization} onChange={e=>onChange('creditUtilization', e.target.value)} />
            <div className="help">Roughly, balance ÷ limit × 100.</div>
          </div>
          <div className="row">
            <div className="field" style={{flex:'1 1 120px'}}>
              <label>Savings last month</label>
              <input className="input" inputMode="decimal" value={a.savings1} onChange={e=>onChange('savings1', e.target.value)} />
            </div>
            <div className="field" style={{flex:'1 1 120px'}}>
              <label>Two months ago</label>
              <input className="input" inputMode="decimal" value={a.savings2} onChange={e=>onChange('savings2', e.target.value)} />
            </div>
            <div className="field" style={{flex:'1 1 120px'}}>
              <label>Three months ago</label>
              <input className="input" inputMode="decimal" value={a.savings3} onChange={e=>onChange('savings3', e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{marginTop:16}}>
        <h3>Your snapshot</h3>
        <div className="row">
          <div className="kpi"><span className="badge">Score</span><span className="num">{metrics.score}</span></div>
          <div className="kpi"><span className="badge">Stage</span><span className="num">{metrics.band}</span></div>
          <div className="kpi"><span className="badge">DTI</span><span className="num">{metrics.dti}%</span></div>
          <div className="kpi"><span className="badge">Emergency</span><span className="num">{metrics.monthsEmergency} mo</span></div>
        </div>
        <div className="progress" style={{marginTop:12}}>
          <span style={{ width: `${metrics.score}%` }} />
        </div>
        <ul>
          {metrics.recs.map((r, i) => <li key={i} className="note" style={{marginTop:8}}>{r}</li>)}
        </ul>
        <div style={{marginTop:12}}>
          <a className="btn btn-primary" href="/grow">See tools that match</a>
        </div>
      </div>
    </section>
  );
}
