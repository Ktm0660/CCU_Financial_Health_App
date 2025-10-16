export type Choice = "yes" | "sometimes" | "no";
export type Question = { id: string; text: string; tag?: string; weight?: number };
export const QUESTIONS: Question[] = [
  { id: "budget", text: "Do you track where your money goes?", tag: "budget" },
  { id: "autopay", text: "Do you pay bills automatically or on time?", tag: "payments" },
  { id: "emergency", text: "Do you have a small emergency fund?", tag: "emergency" },
  { id: "savingsAuto", text: "Do you save automatically from paychecks?", tag: "savings" },
  { id: "creditScore", text: "Do you know your credit score?", tag: "credit" },
  { id: "avoidPayday", text: "Can you avoid payday or title loans?", tag: "relief" },
  { id: "loanUnderstanding", text: "Do you understand loan terms before signing?", tag: "education" },
  { id: "overdraft", text: "Do you avoid overdraft or have protection?", tag: "fresh-start" },
  { id: "planning", text: "Do you plan for big upcoming costs?", tag: "planning" },
  { id: "incomeSmooth", text: "Do you have a plan for months with less income?", tag: "liquidity" },
  { id: "mobileAccess", text: "Do you use mobile or online banking?", tag: "access" },
  { id: "trust", text: "Do you feel comfortable asking us money questions?", tag: "trust" },
  { id: "idDocs", text: "Do you have your ID or ITIN ready for services?", tag: "itin" },
  { id: "safety", text: "Do you feel your money is safe and protected?", tag: "safety" },
  { id: "debtPlan", text: "Do you have a simple plan to pay down debt?", tag: "debt" },
  { id: "creditUtil", text: "Is your credit card balance under 30% of the limit?", tag: "credit" },
  { id: "savingsGoal", text: "Do you have a savings goal for the next 3 months?", tag: "savings" },
  { id: "insurance", text: "Do you have basic insurance for major risks?", tag: "safety" },
];
export function pointsFor(choice: Choice): number {
  if (choice === "yes") return 2;
  if (choice === "sometimes") return 1;
  return 0;
}
export function computeScore(answers: Record<string, Choice>) {
  const total = QUESTIONS.reduce((sum, q) => sum + pointsFor(answers[q.id] ?? "no"), 0);
  const max = QUESTIONS.length * 2;
  return Math.round((total / max) * 100);
}
export function scoreBand(score: number) {
  if (score < 25) return { band: "Getting Started", color: "text-brand-danger" };
  if (score < 50) return { band: "Building Momentum", color: "text-brand-warn" };
  if (score < 75) return { band: "On Track", color: "text-brand-blue" };
  return { band: "Thriving", color: "text-brand-success" };
}
export function nextSteps(tags: string[]) {
  const tips: Record<string, string> = {
    budget: "Track spending weekly—awareness builds control.",
    payments: "Use autopay or reminders to avoid late fees.",
    emergency: "Start a $250 cushion; even small savings help.",
    savings: "Auto-transfer $25 per paycheck into savings.",
    credit: "Keep utilization low; pay statement balances.",
    relief: "Replace payday debt with a lower-cost Relief Loan.",
    education: "Ask us to explain terms clearly—no jargon.",
    "fresh-start": "Fresh Start Checking helps avoid overdrafts.",
    planning: "Set aside for upcoming costs to reduce stress.",
    liquidity: "Use AutoSaver to smooth month-to-month cash.",
    access: "Enable mobile alerts to track balances.",
    trust: "Our counselors are confidential and free.",
    itin: "We accept ITINs and various IDs for fair access.",
    safety: "Use secure logins + two-factor protection.",
    debt: "Snowball tiny balances; automate payments.",
  };
  const uniq = Array.from(new Set(tags));
  return uniq.map((t) => tips[t]).filter(Boolean).slice(0, 6);
}
export function improvementTags(answers: Record<string, Choice>) {
  return QUESTIONS
    .filter((q) => (answers[q.id] ?? "no") !== "yes" && q.tag)
    .map((q) => q.tag!) as string[];
}
