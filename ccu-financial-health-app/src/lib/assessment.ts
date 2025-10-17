export const QUESTIONS = [
  { id: 'pay_on_time', text: 'I pay my bills on time.' },
  { id: 'emergency_savings', text: 'I have some money saved for emergencies.' },
  { id: 'track_spending', text: 'I keep track of my spending each month.' },
  { id: 'budget', text: 'I have a plan (budget) for my money.' },
  { id: 'avoid_payday', text: 'I avoid payday or title loans.' },
  { id: 'debt_plan', text: 'I have a plan to pay off my debt.' },
  { id: 'credit_util', text: 'My credit card balance is below 30% of my limit.' },
  { id: 'income_stable', text: 'My income is steady month to month.' },
  { id: 'bank_access', text: 'I can easily use a credit union or online banking.' },
  { id: 'understand_fees', text: 'I understand the fees I pay.' },
  { id: 'big_goal', text: 'I have a big financial goal (car, home, education).' },
  { id: 'prefer_spanish', text: 'I would like help in Spanish.' },
]

export function scoreAssessment(answers: Record<string, number>) {
  let score = 0
  for (const q of QUESTIONS) score += answers[q.id] ?? 0
  const max = QUESTIONS.length * 2
  const percent = Math.round((score / max) * 100)
  const band = percent >= 75 ? 'Strong' : percent >= 50 ? 'Building' : 'Getting Started'
  return { percent, band }
}

export function recommendProducts(answers: Record<string, number>) {
  const needs: string[] = []
  if ((answers['emergency_savings'] ?? 0) < 2) needs.push('build_savings')
  if ((answers['avoid_payday'] ?? 0) < 2) needs.push('personal-loan')
  if ((answers['budget'] ?? 0) < 2) needs.push('financial-literacy')
  if ((answers['bank_access'] ?? 0) < 2) needs.push('mobile-unit')
  if ((answers['big_goal'] ?? 0) > 0) needs.push('auto-loan')
  return needs
}
