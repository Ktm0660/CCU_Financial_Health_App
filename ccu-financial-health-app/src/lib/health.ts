export type Numeric = number | null | undefined;

/** Safe parse of possibly empty string */
export function toNum(v: string | number | null | undefined): number | null {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number' && !Number.isNaN(v)) return v;
  const n = Number(String(v).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

/** Debt-to-Income ratio (0..100), null-safe */
export function calcDTI(monthlyDebt: Numeric, monthlyIncome: Numeric): number {
  const d = typeof monthlyDebt === 'number' ? monthlyDebt : 0;
  const i = typeof monthlyIncome === 'number' && monthlyIncome > 0 ? monthlyIncome : null;
  if (!i) return 100; // unknown income => treat as high risk
  const r = Math.min(1, Math.max(0, d / i));
  return Math.round(r * 100);
}

/** Months of emergency fund (0..12 capped) */
export function calcEmergencyMonths(opts: { monthlyExpenses: Numeric; emergencyFund: Numeric }): number {
  const e = typeof opts.monthlyExpenses === 'number' && opts.monthlyExpenses > 0 ? opts.monthlyExpenses : null;
  const f = typeof opts.emergencyFund === 'number' ? opts.emergencyFund : 0;
  if (!e) return 0;
  return Math.min(12, Math.max(0, Math.round((f / e) * 10) / 10));
}

/** Very simple savings momentum 0..100 based on 3 months history */
export function calcSavingsProgress(last3: number[]): number {
  if (!last3.length) return 0;
  const total = last3.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
  const avg = total / last3.length;
  const score = Math.max(0, Math.min(100, Math.round((avg / 500) * 100))); // 500 is arbitrary baseline
  return score;
}

/** Normalize any number of metrics (0..100 good=high) into a single 0..100 score */
export function normalizeTo100(...metrics: Numeric[]): number {
  // nulls are ignored; if all null => 50 (neutral)
  const usable = metrics
    .map(m => (typeof m === 'number' ? m : null))
    .filter((m): m is number => m !== null && Number.isFinite(m));
  if (!usable.length) return 50;
  // DTI is "lower is better"; assume inputs already oriented high-is-good except DTI
  // Caller should send (100 - dti) for DTI.
  const avg = usable.reduce((a, b) => a + b, 0) / usable.length;
  return Math.round(Math.max(0, Math.min(100, avg)));
}

export type Band = 'Stabilizing' | 'Building' | 'Thriving';

export function scoreToBand(score: number): Band {
  if (score < 40) return 'Stabilizing';
  if (score < 70) return 'Building';
  return 'Thriving';
}

export function buildRecommendations(input: {
  dti: number;
  monthsEmergency: number;
  savingsMomentum: number;
  creditUtilization: number;
}): string[] {
  const recs: string[] = [];
  if (input.monthsEmergency < 1) {
    recs.push('Start a $10–$25 “first cushion” auto-transfer into a separate savings pocket.');
  } else if (input.monthsEmergency < 3) {
    recs.push('Grow your emergency fund toward 1–3 months. Small, automatic transfers beat occasional big ones.');
  }
  if (input.dti > 45) {
    recs.push('Consider a small-dollar consolidation loan to replace high-cost payday or title loans.');
  }
  if (input.creditUtilization > 50) {
    recs.push('Aim to keep credit card balances under ~30% of limits; payments right after payday help.');
  }
  if (input.savingsMomentum < 30) {
    recs.push('Use round-ups or paycheck splits to make saving effortless.');
  }
  recs.push('Meet with a certified financial counselor (free, judgment-free).');
  return recs;
}
