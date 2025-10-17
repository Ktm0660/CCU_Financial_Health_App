"use client";

import Link from "next/link";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-client";
import { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return <span className="icon">{children}</span>;
}

export default function Home() {
  useLocale();

  return (
    <div className="stack-lg">
      {/* Hero */}
      <section className="card-hero card-pad shadow-hover">
        <div className="stack-lg">
          <div className="stack">
            <h1 className="h1">{t("hero.title")}</h1>
            <p className="lead">{t("hero.subtitle")}</p>
          </div>
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
            <Link href="/assess" className="btn btn-primary">
              {t("cta.start")}
            </Link>
            <Link href="/products" className="btn btn-outline">
              {t("products.title")}
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="grid-3">
        <article className="card card-pad shadow-hover">
          <div className="stack">
            <Icon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 3l9 6-9 6-9-6 9-6Z" stroke="var(--brand-blue)" strokeWidth="1.8" />
              </svg>
            </Icon>
            <h2 className="h2">Simple</h2>
            <p className="muted">Plain language and small steps you can use today.</p>
          </div>
        </article>
        <article className="card card-pad shadow-hover">
          <div className="stack">
            <Icon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 4h16v12H4V4Zm0 12 4 4h8l4-4" stroke="var(--brand-blue)" strokeWidth="1.8" />
              </svg>
            </Icon>
            <h2 className="h2">Transparent</h2>
            <p className="muted">Upfront about costs, terms, and how each product helps.</p>
          </div>
        </article>
        <article className="card card-pad shadow-hover">
          <div className="stack">
            <Icon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 12l3 3 9-9" stroke="var(--brand-blue)" strokeWidth="1.8" />
              </svg>
            </Icon>
            <h2 className="h2">Supportive</h2>
            <p className="muted">Certified counselors, a mobile unit, and a community-first approach.</p>
          </div>
        </article>
      </section>

      {/* CTA */}
      <section className="card card-pad shadow-hover">
        <div className="stack">
          <h2 className="h2">Get started</h2>
          <p className="muted">
            Answer a few questions. We’ll suggest small actions and products with total transparency.
          </p>
          <Link href="/assess" className="btn btn-primary">
            Start the assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
