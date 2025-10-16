export interface CalcDTIInput {
  monthlyIncome: number;
  debtsMinPayments: number[];
}

export function calcDTI({ monthlyIncome, debtsMinPayments }: CalcDTIInput): number {
  const income = Number.isFinite(monthlyIncome) ? Math.max(0, monthlyIncome) : 0;
  const totalPayments = debtsMinPayments
    .filter((payment) => Number.isFinite(payment))
    .reduce((sum, payment) => sum + Math.max(0, payment), 0);

  if (income === 0) {
    return totalPayments > 0 ? 100 : 0;
  }

  return (totalPayments / income) * 100;
}

export interface CalcEmergencyMonthsInput {
  monthlyExpenses: number;
  emergencyFund: number;
}

export function calcEmergencyMonths({ monthlyExpenses, emergencyFund }: CalcEmergencyMonthsInput): number {
  const expenses = Number.isFinite(monthlyExpenses) ? Math.max(0, monthlyExpenses) : 0;
  const fund = Number.isFinite(emergencyFund) ? Math.max(0, emergencyFund) : 0;

  if (expenses === 0) {
    return fund > 0 ? 100 : 0;
  }

  return fund / expenses;
}

export function calcSavingsProgress(contributions: number[]): number {
  if (!Array.isArray(contributions) || contributions.length === 0) {
    return 0;
  }

  const positives = contributions.filter((value) => Number.isFinite(value) && value >= 0);
  if (positives.length === 0) {
    return 0;
  }

  const latest = positives[positives.length - 1];
  return Math.min(100, latest);
}

// helper to clamp values
const clamp0to100 = (n: number) => Math.max(0, Math.min(100, n));

/**
 * Normalize either a single score or multiple component scores to 0–100.
 * - If given one number: clamps it to [0,100].
 * - If given multiple numbers: clamps each and returns their average.
 */
export function normalizeTo100(value: number): number;
export function normalizeTo100(...values: number[]): number;
export function normalizeTo100(...args: number[]): number {
  if (args.length === 0) return 0;
  if (args.length === 1) return clamp0to100(args[0]);
  const sum = args.map(clamp0to100).reduce((a, b) => a + b, 0);
  return sum / args.length;
}

export function scoreToBand(score: number): "excellent" | "good" | "fair" | "poor" {
  const normalized = clamp0to100(score);
  if (normalized >= 80) return "excellent";
  if (normalized >= 60) return "good";
  if (normalized >= 40) return "fair";
  return "poor";
}

export function buildRecommendations(
  dti: number,
  emergencyMonths: number,
  savingsProgress: number,
  creditUtilization: number
): string[] {
  const recs: string[] = [];
  if (dti > 36) recs.push("Lower your debt-to-income ratio below 36%.");
  if (emergencyMonths < 3) recs.push("Build an emergency fund covering at least 3 months of expenses.");
  if (savingsProgress < 50) recs.push("Increase your savings contributions to reach 50% of your goal.");
  if (creditUtilization > 30) recs.push("Keep credit utilization under 30%.");
  if (!recs.length) recs.push("Your financial indicators look strong. Maintain these habits!");
  return recs;
}
