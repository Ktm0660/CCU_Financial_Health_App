export type Product = {
  id: string;
  name: string;
  category:
    | "Checking"
    | "Savings"
    | "Certificates"
    | "Auto Loans"
    | "Personal Loans"
    | "Home Loans"
    | "Card Services"
    | "Business"
    | "Digital Banking"
    | "Member Services"
    | "Resources";
  url: string;
  shortDescription: string;
};

export const catalog: Product[] = [
  // CHECKING
  {
    id: "checking",
    name: "Checking Accounts",
    category: "Checking",
    url: "https://www.connectidaho.org/checking",
    shortDescription: "Everyday accounts with digital access and surcharge-free ATMs."
  },

  // SAVINGS
  {
    id: "savings",
    name: "Savings Accounts",
    category: "Savings",
    url: "https://www.connectidaho.org/savings",
    shortDescription: "Hassle-free savings for rainy days or big goals."
  },
  {
    id: "youth-savings",
    name: "Youth Savings",
    category: "Savings",
    url: "https://www.connectidaho.org/youth-savings",
    shortDescription: "Start early with kid-friendly savings."
  },
  {
    id: "money-market",
    name: "Money Market",
    category: "Savings",
    url: "https://www.connectidaho.org/money-market",
    shortDescription: "Higher yields with flexible access."
  },
  {
    id: "hsa",
    name: "Health Savings (HSA)",
    category: "Savings",
    url: "https://www.connectidaho.org/health-savings-accounts",
    shortDescription: "Tax-advantaged savings for medical expenses."
  },

  // CERTIFICATES
  {
    id: "certificates",
    name: "Certificates (CDs)",
    category: "Certificates",
    url: "https://www.connectidaho.org/certificates",
    shortDescription: "Fixed terms and rates for your nest egg."
  },

  // LOANS
  {
    id: "auto-loans",
    name: "Auto Loans",
    category: "Auto Loans",
    url: "https://www.connectidaho.org/auto-loans",
    shortDescription: "Finance or refinance with competitive rates."
  },
  {
    id: "personal-loans",
    name: "Personal Loans",
    category: "Personal Loans",
    url: "https://www.connectidaho.org/personal-loans",
    shortDescription: "Unsecured funds for life’s curveballs."
  },
  {
    id: "home-loans",
    name: "Home Loans & HELOC",
    category: "Home Loans",
    url: "https://www.connectidaho.org/home-loans",
    shortDescription: "Purchase, refinance, or tap equity."
  },

  // CARDS & DIGITAL
  {
    id: "visa",
    name: "Visa® Credit Cards",
    category: "Card Services",
    url: "https://www.connectidaho.org/visa-credit-cards",
    shortDescription: "Cards with local service and digital controls."
  },
  {
    id: "digital-banking",
    name: "Digital & Mobile Banking",
    category: "Digital Banking",
    url: "https://www.connectidaho.org/digital-banking",
    shortDescription: "Check balances, pay bills, manage cards—anytime."
  },

  // BUSINESS
  {
    id: "business",
    name: "Business Services",
    category: "Business",
    url: "https://www.connectidaho.org/business",
    shortDescription: "Accounts and lending for local businesses."
  },

  // MEMBER SERVICES & RESOURCES
  {
    id: "member-services",
    name: "Member Services",
    category: "Member Services",
    url: "https://www.connectidaho.org/member-services",
    shortDescription: "Wires, notary, insurance partners, and more."
  },
  {
    id: "resources",
    name: "Resource Center",
    category: "Resources",
    url: "https://www.connectidaho.org/resources",
    shortDescription: "Education, calculators, and financial safety."
  }
];
