// TODO: Provide real financial health calculations.
export function calcDTI(..._args: any[]): number {
  throw new Error("calcDTI is not yet implemented.");
}

export function calcEmergencyMonths(..._args: any[]): number {
  throw new Error("calcEmergencyMonths is not yet implemented.");
}

export function calcSavingsProgress(..._args: any[]): number {
  throw new Error("calcSavingsProgress is not yet implemented.");
}

export function normalizeTo100(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function scoreToBand(score: number): "poor" | "fair" | "good" | "great" {
  if (score < 40) return "poor";
  if (score < 60) return "fair";
  if (score < 80) return "good";
  return "great";
}

export function buildRecommendations(..._args: any[]): string[] {
  throw new Error("buildRecommendations is not yet implemented.");
}
