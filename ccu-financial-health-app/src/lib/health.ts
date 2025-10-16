export type Inputs = {
  monthlyIncome: number
  monthlyExpenses: number
  emergencyFund: number
  creditUtilization?: number | null
  debtsMinPayments?: number[] // optional list of minimum payments
}

export function calcDTI({ monthlyIncome, debtsMinPayments = [] }: Inputs) {
  if (!monthlyIncome) return 1
  const totalMin = debtsMinPayments.reduce((s, v) => s + (Number(v) || 0), 0)
  return totalMin / monthlyIncome
}

export function calcEmergencyMonths({ monthlyExpenses, emergencyFund }: Inputs) {
  if (!monthlyExpenses) return 0
  return emergencyFund / monthlyExpenses
}

export function calcSavingsProgress(goals: { targetAmount: number; currentAmount: number }[]) {
  if (!goals?.length) return 0
  const avg = goals.reduce((s, g) => s + Math.min(g.currentAmount / Math.max(g.targetAmount, 1), 1), 0) / goals.length
  return avg
}

export function scoreToBand(score: number) {
  if (score < 50) return "VULNERABLE"
  if (score < 65) return "BUILDING"
  if (score < 80) return "STABLE"
  return "STRONG"
}

// Map metrics to 0–100, then weighted average
export function normalizeTo100(dti: number, emerg: number, savings: number, credit?: number | null) {
  const dtiScore =
    dti <= 0.15 ? 100 :
    dti <= 0.35 ? 90 - ((dti - 0.15) / 0.20) * 20 :
    dti <= 0.50 ? 70 - ((dti - 0.35) / 0.15) * 30 :
    Math.max(10, 40 - ((dti - 0.5) / 0.5) * 30)

  const emergScore =
    emerg >= 9 ? 100 :
    emerg >= 6 ? 90 + ((emerg - 6) / 3) * 10 :
    emerg >= 3 ? 70 + ((emerg - 3) / 3) * 20 :
    emerg >= 1 ? 30 + ((emerg - 1) / 2) * 40 :
    Math.max(0, emerg * 30)

  const savingsScore = Math.max(0, Math.min(100, savings * 100))

  const creditScore =
    credit == null ? null :
    credit <= 0.10 ? 100 :
    credit <= 0.30 ? 95 - ((credit - 0.10) / 0.20) * 15 :
    credit <= 0.60 ? 80 - ((credit - 0.30) / 0.30) * 40 :
    Math.max(10, 40 - ((credit - 0.6) / 0.4) * 30)

  const weights = creditScore == null ? [0.35, 0.35, 0.30] : [0.35, 0.35, 0.20, 0.10]
  const scores = creditScore == null ? [dtiScore, emergScore, savingsScore] : [dtiScore, emergScore, savingsScore, creditScore]
  const weighted = scores.reduce((s, sc, i) => s + sc * weights[i], 0)
  return Math.round(weighted)
}

export function buildRecommendations(dti: number, emerg: number, savings: number, credit?: number | null) {
  const recs: string[] = []
  if (dti > 0.35) recs.push("Lower monthly debt obligations or increase income to improve DTI below 35%.")
  if (emerg < 3) recs.push("Build an emergency fund to cover at least 3 months of expenses.")
  if (savings < 0.5) recs.push("Automate transfers toward savings goals to pass 50% progress.")
  if (credit != null && credit > 0.3) recs.push("Keep credit utilization under 30% to strengthen credit health.")
  if (recs.length === 0) recs.push("Your financial indicators look strong. Maintain your current habits.")
  return recs
}
