export type Product = {
  id: string;
  name: string;
  summary: string;
  whyItHelps: string;
  fees?: string;
  aprRange?: string;
  eligibility?: string[];
  tags: string[]; // match assessment tags
};
export const PRODUCTS: Product[] = [
  {
    id: "itin-lending",
    name: "ITIN Lending",
    summary: "Loans using an Individual Taxpayer Identification Number.",
    whyItHelps: "Builds credit and access to fair financing without SSN.",
    eligibility: ["ITIN", "Proof of income"],
    tags: ["itin", "credit", "access"],
  },
  {
    id: "fresh-start-checking",
    name: "Fresh Start Checking",
    summary: "No-overdraft account to reset safely.",
    whyItHelps: "Avoids surprise fees while rebuilding confidence.",
    fees: "$0–$5/mo",
    tags: ["fresh-start", "safety", "access"],
  },
  {
    id: "relief-loan",
    name: "Relief Loan",
    summary: "Small-dollar loan replacing payday debt.",
    whyItHelps: "Lower cost, fixed terms, predictable payments.",
    tags: ["relief", "liquidity", "safety", "debt"],
  },
  {
    id: "credit-builder",
    name: "Credit Builder Loan",
    summary: "A small loan held in savings to build history.",
    whyItHelps: "Improves credit while growing savings.",
    tags: ["credit", "savings"],
  },
  {
    id: "auto-saver",
    name: "AutoSaver",
    summary: "Automatic savings from each paycheck.",
    whyItHelps: "Smooths income swings and grows a cushion.",
    tags: ["savings", "liquidity", "emergency", "planning"],
  },
  {
    id: "secured-card",
    name: "Secured Credit Card",
    summary: "Deposit-backed credit line to build safely.",
    whyItHelps: "Builds credit responsibly with clear limits.",
    tags: ["credit", "safety"],
  },
];
