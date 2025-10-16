export type DebtInputs = { monthlyIncome: number; totalDebtPayments: number };
export type EmergencyInputs = { monthlyExpenses: number; emergencyFund: number };

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function calcDTI({ monthlyIncome, totalDebtPayments }: DebtInputs): number {
  if (!Number.isFinite(monthlyIncome) || monthlyIncome <= 0) {
    return 0;
  }
  if (!Number.isFinite(totalDebtPayments) || totalDebtPayments <= 0) {
    return 0;
  }
  return clamp(totalDebtPayments / monthlyIncome, 0, 1);
}

export function calcEmergencyMonths({ monthlyExpenses, emergencyFund }: EmergencyInputs): number {
  if (!Number.isFinite(monthlyExpenses) || monthlyExpenses <= 0) {
    return 0;
  }
  if (!Number.isFinite(emergencyFund) || emergencyFund <= 0) {
    return 0;
  }
  return clamp(emergencyFund / monthlyExpenses, 0, 12);
}

export function calcSavingsProgress(contributions: number[]): number {
  if (!Array.isArray(contributions) || contributions.length === 0) {
    return 0;
  }
  const total = contributions
    .filter((value) => Number.isFinite(value) && value > 0)
    .reduce((sum, value) => sum + value, 0);
  if (total <= 0) {
    return 0;
  }
  return clamp(total / 500);
}

export function normalizeTo100(dti: number, emergencyMonths: number, savingsProgress: number, creditUtilization: number): number {
  const dtiScore = clamp(1 - dti) * 25;
  const emergencyScore = clamp(emergencyMonths / 6) * 25;
  const savingsScore = clamp(savingsProgress) * 25;
  const creditScore = clamp(1 - clamp(creditUtilization / 100)) * 25;
  const total = dtiScore + emergencyScore + savingsScore + creditScore;
  return Math.round(total);
}

export function scoreToBand(score: number): string {
  if (score >= 80) return "Thriving";
  if (score >= 60) return "Stable";
  if (score >= 40) return "Building";
  return "Emerging";
}

export function buildRecommendations(dti: number, emergencyMonths: number, savingsProgress: number, creditUtilization: number): string[] {
  const tips: string[] = [];

  if (dti > 0.43) {
    tips.push("Consider consolidating or refinancing high-interest debts to lower your monthly payments.");
  } else if (dti > 0.3) {
    tips.push("Try directing small windfalls toward extra debt payments to gradually reduce balances.");
  } else {
    tips.push("Keep tracking your debt-to-income ratio so you stay ahead of major expenses.");
  }

  if (emergencyMonths < 1) {
    tips.push("Start a mini emergency fund by setting aside $25-$50 per paycheck in a separate account.");
  } else if (emergencyMonths < 3) {
    tips.push("Aim to build your emergency fund toward 3 months of expenses to cushion surprises.");
  } else {
    tips.push("Great job on your emergency reserves—consider labeling a portion for future goals.");
  }

  if (savingsProgress < 0.25) {
    tips.push("Automate a small transfer to savings each payday to make progress without thinking about it.");
  } else if (savingsProgress < 0.75) {
    tips.push("Review your goals and increase contributions when raises or windfalls arrive.");
  } else {
    tips.push("Celebrate your steady savings habit and check if any goals need a refresh.");
  }

  if (creditUtilization > 50) {
    tips.push("Work toward paying cards down below 50% of their limits to boost your credit health.");
  } else if (creditUtilization > 30) {
    tips.push("Aim to keep card balances below 30% of limits by making mid-cycle payments.");
  } else {
    tips.push("Your credit use looks balanced—keep paying on time to maintain momentum.");
  }

  return tips;
}
