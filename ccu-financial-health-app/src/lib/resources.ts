export type Resource = {
  id: string;
  title: string;
  summary: string;
  href: string;        // route or external URL
  tag: "Emergency" | "Credit" | "Savings" | "Counseling" | "Access";
};

export const resources: Resource[] = [
  {
    id: "relief-loan",
    title: "Small-Dollar Relief Loan",
    summary: "Fast cash with fair terms. Lower fees than payday lenders.",
    href: "/resources#relief-loan",
    tag: "Emergency"
  },
  {
    id: "counseling",
    title: "Free Financial Counseling",
    summary: "Talk with a certified counselor. No judgment. Private.",
    href: "/resources#counseling",
    tag: "Counseling"
  },
  {
    id: "itin-credit",
    title: "ITIN Credit Builder",
    summary: "Build credit with an ITIN. Clear payments and reporting.",
    href: "/resources#itin-credit",
    tag: "Credit"
  },
  {
    id: "starter-savings",
    title: "Starter Savings",
    summary: "Open with a few dollars. Build a habit with auto-save.",
    href: "/resources#starter-savings",
    tag: "Savings"
  },
  {
    id: "access-onramp",
    title: "Easy Account On-Ramp",
    summary: "Clear steps, simple IDs, help in your language.",
    href: "/resources#access-onramp",
    tag: "Access"
  }
];
