"use client";

import Link from "next/link";
import Card from "@/components/Card";
import { useLanguage } from "@/components/LanguageProvider";

const HERO_COPY = {
  en: {
    heading: "Feel confident with your money.",
    subheading:
      "Simple steps, transparent options, and caring guidance—built for rural and underserved members.",
    primaryCta: "Start your 3-minute checkup",
    secondaryCta: "Products & Services",
  },
  es: {
    heading: "Siéntase seguro con su dinero.",
    subheading:
      "Pasos simples, opciones transparentes y orientación con empatía—diseñado para comunidades rurales y desatendidas.",
    primaryCta: "Comience su chequeo de 3 minutos",
    secondaryCta: "Productos y servicios",
  },
};

const VALUE_CARDS = [
  {
    title_en: "Simple",
    title_es: "Sencillo",
    body_en: "Plain language and small steps you can use today.",
    body_es: "Lenguaje claro y pasos pequeños que puede usar hoy.",
  },
  {
    title_en: "Transparent",
    title_es: "Transparente",
    body_en: "Upfront about costs, terms, and how each product helps.",
    body_es: "Claridad sobre costos, términos y cómo cada producto ayuda.",
  },
  {
    title_en: "Supportive",
    title_es: "Acompañamiento",
    body_en: "Certified counselors, a mobile unit, and a community-first approach.",
    body_es: "Asesores certificados, una unidad móvil y un enfoque comunitario.",
  },
];

const STEPS = {
  en: [
    "Take a quick, plain-language checkup.",
    "See simple steps and trusted tools.",
    "Connect with a counselor when you’re ready.",
  ],
  es: [
    "Realice un chequeo rápido y en lenguaje sencillo.",
    "Vea pasos simples y herramientas confiables.",
    "Conéctese con un asesor cuando esté listo.",
  ],
};

export default function HomePage() {
  const { language } = useLanguage();
  const hero = HERO_COPY[language];
  const steps = STEPS[language];
  const isSpanish = language === "es";

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-[var(--line)] bg-white p-8 shadow-sm md:p-10">
        <p className="mb-3 text-xs font-semibold tracking-widest text-[var(--ink-2)]">
          {isSpanish ? "CONNECTIONS CU" : "CONNECTIONS CU"}
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-[var(--ink)] md:text-5xl">{hero.heading}</h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--ink-2)]">{hero.subheading}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/assess"
            className="rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--accent-700)]"
          >
            {hero.primaryCta}
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-[var(--line)] px-5 py-3 font-semibold text-[var(--ink)] transition hover:bg-[var(--bg)]"
          >
            {hero.secondaryCta}
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {VALUE_CARDS.map((card) => (
          <Card key={card.title_en} className="p-6">
            <h3 className="text-xl font-semibold text-[var(--ink)]">
              {isSpanish ? card.title_es : card.title_en}
            </h3>
            <p className="mt-2 text-[var(--ink-2)]">{isSpanish ? card.body_es : card.body_en}</p>
          </Card>
        ))}
      </section>

      <Card className="p-6">
        <h2 className="text-2xl font-bold text-[var(--ink)]">{isSpanish ? "Cómo funciona" : "How it works"}</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-[var(--ink-2)]">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
