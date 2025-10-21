export type Choice = {
  value: number; // 0..3 where higher is “stronger” for the intended dimension, we’ll invert as needed
  label: string;
};
export type Question = {
  id: string;
  section: "Habits" | "Confidence" | "Stability";
  text: { en: string; es: string };
  choices: { en: Choice[]; es: Choice[] };
  invert?: boolean; // if true, higher choice value means lower score contribution
};

export const QUESTIONS: Question[] = [
  // Spending Awareness & Habits (1–5) -> Habits
  {
    id: "q1",
    section: "Habits",
    text: {
      en: "When the month ends, do you usually know where most of your money went?",
      es: "Cuando termina el mes, ¿suele saber a dónde fue la mayor parte de su dinero?"
    },
    choices: {
      en: [
        { value: 3, label: "Yes, I track it closely" },
        { value: 2, label: "I have a general idea" },
        { value: 1, label: "Not really" },
        { value: 0, label: "No, it often surprises me" }
      ],
      es: [
        { value: 3, label: "Sí, lo sigo de cerca" },
        { value: 2, label: "Tengo una idea general" },
        { value: 1, label: "No mucho" },
        { value: 0, label: "No, a menudo me sorprende" }
      ]
    }
  },
  {
    id: "q2",
    section: "Habits",
    text: {
      en: "How often do you feel stressed about paying regular bills?",
      es: "¿Con qué frecuencia se siente estresado al pagar sus facturas?"
    },
    choices: {
      en: [
        { value: 3, label: "Hardly ever" },
        { value: 2, label: "Sometimes" },
        { value: 1, label: "Often" },
        { value: 0, label: "Almost every month" }
      ],
      es: [
        { value: 3, label: "Casi nunca" },
        { value: 2, label: "A veces" },
        { value: 1, label: "A menudo" },
        { value: 0, label: "Casi todos los meses" }
      ]
    },
    invert: true
  },
  {
    id: "q3",
    section: "Habits",
    text: {
      en: "Everyday purchases (groceries, gas): what usually guides your decision?",
      es: "Compras diarias (comida, gasolina): ¿qué guía su decisión?"
    },
    choices: {
      en: [
        { value: 3, label: "I follow a list/budget" },
        { value: 2, label: "I try to be careful" },
        { value: 1, label: "I buy what I need in the moment" },
        { value: 0, label: "I often spend without planning" }
      ],
      es: [
        { value: 3, label: "Sigo una lista/presupuesto" },
        { value: 2, label: "Intento ser cuidadoso" },
        { value: 1, label: "Compro lo que necesito en el momento" },
        { value: 0, label: "A menudo gasto sin planificar" }
      ]
    }
  },
  {
    id: "q4",
    section: "Habits",
    text: {
      en: "When you think about your spending, what best describes you?",
      es: "Cuando piensa en sus gastos, ¿qué lo describe mejor?"
    },
    choices: {
      en: [
        { value: 3, label: "I plan and track before I spend" },
        { value: 2, label: "I check my balance day-to-day" },
        { value: 1, label: "I try not to look — it stresses me" },
        { value: 0, label: "I avoid thinking about it" }
      ],
      es: [
        { value: 3, label: "Planifico y registro antes de gastar" },
        { value: 2, label: "Reviso mi saldo día a día" },
        { value: 1, label: "Trato de no mirar — me estresa" },
        { value: 0, label: "Evito pensar en eso" }
      ]
    },
    invert: false
  },
  {
    id: "q5",
    section: "Habits",
    text: {
      en: "If you had extra money at month-end, what would you do first?",
      es: "Si le sobrara dinero al final del mes, ¿qué haría primero?"
    },
    choices: {
      en: [
        { value: 3, label: "Add to savings" },
        { value: 2, label: "Pay down debt" },
        { value: 1, label: "Treat myself or family" },
        { value: 0, label: "I usually don’t have extra" }
      ],
      es: [
        { value: 3, label: "Ahorrar más" },
        { value: 2, label: "Pagar deudas" },
        { value: 1, label: "Darme un gusto / familia" },
        { value: 0, label: "Casi nunca me sobra" }
      ]
    },
    invert: false
  },

  // Saving & Stability (6–8) -> Stability
  {
    id: "q6",
    section: "Stability",
    text: {
      en: "Do you have money set aside for emergencies?",
      es: "¿Tiene dinero apartado para emergencias?"
    },
    choices: {
      en: [
        { value: 3, label: "Yes, a few months' worth" },
        { value: 2, label: "A little, but not much" },
        { value: 1, label: "Not now, but I want to start" },
        { value: 0, label: "No, I live paycheck to paycheck" }
      ],
      es: [
        { value: 3, label: "Sí, para algunos meses" },
        { value: 2, label: "Un poco, no mucho" },
        { value: 1, label: "No ahora, pero quiero empezar" },
        { value: 0, label: "No, vivo al día" }
      ]
    }
  },
  {
    id: "q7",
    section: "Stability",
    text: {
      en: "How confident are you about reaching your financial goals?",
      es: "¿Qué tan seguro se siente de alcanzar sus metas financieras?"
    },
    choices: {
      en: [
        { value: 3, label: "Very confident" },
        { value: 2, label: "Somewhat confident" },
        { value: 1, label: "Unsure" },
        { value: 0, label: "Not confident" }
      ],
      es: [
        { value: 3, label: "Muy seguro" },
        { value: 2, label: "Algo seguro" },
        { value: 1, label: "Inseguro" },
        { value: 0, label: "Nada seguro" }
      ]
    }
  },
  {
    id: "q8",
    section: "Stability",
    text: {
      en: "When unexpected income (like a tax refund) comes in, you usually:",
      es: "Cuando recibe dinero inesperado (como un reembolso de impuestos), usted suele:"
    },
    choices: {
      en: [
        { value: 3, label: "Save most of it" },
        { value: 2, label: "Split: some spend, some save" },
        { value: 1, label: "Catch up on bills or debt" },
        { value: 0, label: "Spend it right away" }
      ],
      es: [
        { value: 3, label: "Ahorrar la mayor parte" },
        { value: 2, label: "Dividir: gasto y ahorro" },
        { value: 1, label: "Ponerme al día con cuentas/deudas" },
        { value: 0, label: "Gastarlo de inmediato" }
      ]
    }
  },

  // Borrowing & Credit (9–11) -> Stability (stress) or Habits? We’ll map to Stability due to resilience.
  {
    id: "q9",
    section: "Stability",
    text: {
      en: "How do you feel about your current debt?",
      es: "¿Cómo se siente acerca de sus deudas actuales?"
    },
    choices: {
      en: [
        { value: 3, label: "Manage it well, pay on time" },
        { value: 2, label: "Okay, sometimes hard" },
        { value: 1, label: "Stressful or overwhelming" },
        { value: 0, label: "I don’t have credit/loans now" }
      ],
      es: [
        { value: 3, label: "Lo manejo bien, pago a tiempo" },
        { value: 2, label: "Bien, a veces difícil" },
        { value: 1, label: "Estresante o abrumador" },
        { value: 0, label: "No tengo créditos/préstamos" }
      ]
    },
    invert: false
  },
  {
    id: "q10",
    section: "Stability",
    text: {
      en: "When you need to borrow money, where do you usually turn?",
      es: "Cuando necesita pedir dinero prestado, ¿a dónde suele acudir?"
    },
    choices: {
      en: [
        { value: 3, label: "Bank or credit union" },
        { value: 2, label: "Family or friends" },
        { value: 1, label: "Payday or online lender" },
        { value: 0, label: "I avoid borrowing" }
      ],
      es: [
        { value: 3, label: "Banco o cooperativa" },
        { value: 2, label: "Familia o amigos" },
        { value: 1, label: "Prestamista rápido/en línea" },
        { value: 0, label: "Evito pedir prestado" }
      ]
    }
  },
  {
    id: "q11",
    section: "Stability",
    text: {
      en: "Have you ever been turned down for a loan or credit?",
      es: "¿Le han negado un préstamo o crédito?"
    },
    choices: {
      en: [
        { value: 3, label: "No" },
        { value: 2, label: "Yes, once or twice" },
        { value: 1, label: "Yes, more than once" },
        { value: 0, label: "I’ve never applied" }
      ],
      es: [
        { value: 3, label: "No" },
        { value: 2, label: "Sí, una o dos veces" },
        { value: 1, label: "Sí, más de una vez" },
        { value: 0, label: "Nunca he solicitado" }
      ]
    },
    invert: true
  },

  // Trust & Connection (12–15) -> Confidence
  {
    id: "q12",
    section: "Confidence",
    text: {
      en: "Do you currently have an account with a bank or credit union?",
      es: "¿Actualmente tiene una cuenta en un banco o cooperativa?"
    },
    choices: {
      en: [
        { value: 3, label: "Yes, and I use it often" },
        { value: 2, label: "Yes, but I rarely use it" },
        { value: 1, label: "I used to, but not anymore" },
        { value: 0, label: "No, I don’t right now" }
      ],
      es: [
        { value: 3, label: "Sí, y la uso a menudo" },
        { value: 2, label: "Sí, pero rara vez la uso" },
        { value: 1, label: "Antes sí, ahora no" },
        { value: 0, label: "No, no tengo" }
      ]
    }
  },
  {
    id: "q13",
    section: "Confidence",
    text: {
      en: "How comfortable are you talking with financial institutions about your money?",
      es: "¿Qué tan cómodo se siente hablando con instituciones financieras sobre su dinero?"
    },
    choices: {
      en: [
        { value: 3, label: "Very comfortable — I feel understood" },
        { value: 2, label: "Somewhat comfortable — depends on who" },
        { value: 1, label: "Not comfortable — I feel judged" },
        { value: 0, label: "I avoid it — I don’t trust they’ll help" }
      ],
      es: [
        { value: 3, label: "Muy cómodo — me siento comprendido" },
        { value: 2, label: "Algo cómodo — depende de la persona" },
        { value: 1, label: "Incómodo — me siento juzgado" },
        { value: 0, label: "Lo evito — no confío que ayuden" }
      ]
    }
  },
  {
    id: "q14",
    section: "Confidence",
    text: {
      en: "What has made you hesitant to use or trust a bank/credit union?",
      es: "¿Qué le ha hecho dudar en usar o confiar en un banco/cooperativa?"
    },
    choices: {
      en: [
        { value: 3, label: "Nothing — I feel comfortable" },
        { value: 2, label: "Fees/costs or confusion" },
        { value: 1, label: "Not feeling welcomed/understood" },
        { value: 0, label: "I prefer cash or informal options" }
      ],
      es: [
        { value: 3, label: "Nada — me siento cómodo" },
        { value: 2, label: "Cuotas/costos o confusión" },
        { value: 1, label: "No me siento bienvenido/entendido" },
        { value: 0, label: "Prefiero efectivo u opciones informales" }
      ]
    }
  },
  {
    id: "q15",
    section: "Confidence",
    text: {
      en: "If getting help was easy, judgment-free, and transparent — how likely would you engage?",
      es: "Si recibir ayuda fuera fácil, sin juicios y transparente, ¿qué tan probable es que participe?"
    },
    choices: {
      en: [
        { value: 3, label: "Very likely" },
        { value: 2, label: "Maybe — if I felt safe" },
        { value: 1, label: "Unsure" },
        { value: 0, label: "Not likely" }
      ],
      es: [
        { value: 3, label: "Muy probable" },
        { value: 2, label: "Tal vez — si me siento seguro" },
        { value: 1, label: "No estoy seguro" },
        { value: 0, label: "Poco probable" }
      ]
    }
  },

  // Planning & Support (16–18) -> Confidence (readiness) & Stability
  {
    id: "q16",
    section: "Confidence",
    text: {
      en: "Do you have a plan for big goals (car, home, debt payoff)?",
      es: "¿Tiene un plan para metas grandes (auto, casa, pagar deudas)?"
    },
    choices: {
      en: [
        { value: 3, label: "Yes, and I follow it" },
        { value: 2, label: "I’ve thought about it" },
        { value: 1, label: "Not yet, I’d like help" },
        { value: 0, label: "No plan — taking it as it comes" }
      ],
      es: [
        { value: 3, label: "Sí, y lo sigo" },
        { value: 2, label: "Lo he pensado" },
        { value: 1, label: "Aún no, me gustaría ayuda" },
        { value: 0, label: "Sin plan — voy sobre la marcha" }
      ]
    }
  },
  {
    id: "q17",
    section: "Confidence",
    text: {
      en: "Do you have someone you trust to talk about money decisions?",
      es: "¿Tiene a alguien de confianza para hablar de decisiones de dinero?"
    },
    choices: {
      en: [
        { value: 3, label: "Yes, we talk often" },
        { value: 2, label: "Sometimes, not regularly" },
        { value: 1, label: "Not really, but I wish I did" },
        { value: 0, label: "No, I handle it alone" }
      ],
      es: [
        { value: 3, label: "Sí, hablamos a menudo" },
        { value: 2, label: "A veces, no regularmente" },
        { value: 1, label: "No mucho, pero me gustaría" },
        { value: 0, label: "No, lo manejo solo(a)" }
      ]
    }
  },
  {
    id: "q18",
    section: "Confidence",
    text: {
      en: "Most days, money makes me feel:",
      es: "La mayoría de los días, el dinero me hace sentir:"
    },
    choices: {
      en: [
        { value: 3, label: "Calm and in control" },
        { value: 2, label: "Trying, but stressed" },
        { value: 1, label: "Unsure or anxious" },
        { value: 0, label: "Overwhelmed or stuck" }
      ],
      es: [
        { value: 3, label: "Tranquilo y en control" },
        { value: 2, label: "Intentándolo, pero con estrés" },
        { value: 1, label: "Inseguro o ansioso" },
        { value: 0, label: "Abrumado o estancado" }
      ]
    },
    invert: false
  }
];

export type AssessmentAnswers = Record<string, number | null>;

export function scoreDimensions(answers: AssessmentAnswers) {
  let sums = { Habits: 0, Confidence: 0, Stability: 0 };
  let counts = { Habits: 0, Confidence: 0, Stability: 0 };

  for (const q of QUESTIONS) {
    const raw = answers[q.id];
    if (raw === null || raw === undefined) continue;
    const val = q.invert ? (3 - raw) : raw; // normalize 0..3 so higher=better
    sums[q.section] += val;
    counts[q.section] += 1;
  }

  const to100 = (sum: number, count: number) =>
    count === 0 ? 0 : Math.round((sum / (count * 3)) * 100);

  return {
    Habits: to100(sums.Habits, counts.Habits),
    Confidence: to100(sums.Confidence, counts.Confidence),
    Stability: to100(sums.Stability, counts.Stability)
  };
}

export function dimensionMessage(dim: "Habits" | "Confidence" | "Stability", score: number) {
  if (dim === "Habits") {
    if (score >= 75) return "Your day-to-day habits are strong. Keep your rhythm going.";
    if (score >= 45) return "You’re finding your rhythm — small, steady steps will help.";
    return "Let’s simplify the day-to-day with easy tools you can use right away.";
  }
  if (dim === "Confidence") {
    if (score >= 75) return "You’re ready to plan and ask for what you need.";
    if (score >= 45) return "You’re open to help — we’ll keep it clear and judgment-free.";
    return "You deserve calm, simple guidance. We’ll meet you where you are.";
  }
  // Stability
  if (score >= 75) return "You’re building a solid cushion and managing credit well.";
  if (score >= 45) return "You’re on your way — let’s grow your safety net.";
  return "Let’s lower stress fast with practical cushions and safer options.";
}

export function nextSteps(dim: "Habits" | "Confidence" | "Stability", score: number) {
  const ideas: string[] = [];
  if (dim === "Habits") {
    if (score < 45) ideas.push("Try a 5-minute weekly money check-in and a simple spending plan.");
    ideas.push("Set one small auto-rule: round-up or $10 weekly to savings.");
  }
  if (dim === "Confidence") {
    ideas.push("Schedule a friendly chat with a certified financial counselor (no pressure).");
    if (score < 45) ideas.push("Pick one goal together — we’ll write it down and make it doable.");
  }
  if (dim === "Stability") {
    ideas.push("Start/boost a small emergency fund and explore safer credit options if needed.");
    if (score < 45) ideas.push("Ask about flexible-fee or ITIN-friendly accounts to reduce costs.");
  }
  return ideas;
}
