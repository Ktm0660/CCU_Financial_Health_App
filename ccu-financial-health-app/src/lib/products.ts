export type Product = {
  id: string
  name: string
  category: 'Checking' | 'Savings' | 'Loans' | 'Cards' | 'Services'
  description: string
  url: string
  highlights?: string[]
  itinFriendly?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'kasasa-cash',
    name: 'Kasasa Cash® Checking',
    category: 'Checking',
    description: 'High-yield checking with no monthly fees and no minimum balance.',
    url: 'https://www.connectidaho.org/checking',
    highlights: ['No monthly fees', 'No minimum balance', 'Rewards for debit use'],
  },
  {
    id: 'personal-loan',
    name: 'Personal Loans',
    category: 'Loans',
    description: 'Unsecured loans for emergencies, bills, or debt consolidation.',
    url: 'https://www.connectidaho.org/personal-loans',
    highlights: ['Flexible use', 'Fast approvals'],
    itinFriendly: true,
  },
  {
    id: 'auto-loan',
    name: 'Auto Loans',
    category: 'Loans',
    description: 'Competitive rates and flexible terms for new or used vehicles.',
    url: 'https://www.connectidaho.org/auto-loans',
    highlights: ['Great rates', 'Quick decisions'],
    itinFriendly: true,
  },
  {
    id: 'home-loan',
    name: 'Home Loans',
    category: 'Loans',
    description: 'Purchase, refinance, or build with a local lender who listens.',
    url: 'https://www.connectidaho.org/home-loans',
    highlights: ['Local service', 'Personal guidance'],
  },
  {
    id: 'connected-checking',
    name: 'Connected Checking',
    category: 'Checking',
    description: 'Simple, no-fee checking with mobile access.',
    url: 'https://www.connectidaho.org/checking',
    highlights: ['No fees', 'Mobile access'],
  },
  {
    id: 'financial-literacy',
    name: 'Financial Literacy Resources',
    category: 'Services',
    description: 'Educational articles, videos, and calculators for better money habits.',
    url: 'https://www.connectidaho.org/financial-literacy',
    highlights: ['Free tools', 'Guides for all ages'],
  },
  {
    id: 'mobile-unit',
    name: 'Mobile Unit',
    category: 'Services',
    description: 'Bringing financial services directly to rural communities.',
    url: 'https://www.connectidaho.org/mobile-unit',
    highlights: ['On-the-go service', 'Rural access'],
  },
]
