"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buildRecommendations, scoreToBand } from "@/lib/health";

const zoneDetails: Record<string, { tone: string; title: string; description: string }> = {
  Thriving: {
    tone: "var(--accent)",
    title: "Thriving",
    description: "You have strong habits in place—keep nurturing them and set new goals to stay engaged.",
  },
  Stable: {
    tone: "#facc15",
    title: "Stable",
    description: "You’re steady with room to grow. A few focused adjustments can boost your resilience.",
  },
  Building: {
    tone: "#ef4444",
    title: "Building",
    description: "You’re laying important groundwork. Let’s focus on the next right steps to build momentum.",
  },
  Emerging: {
    tone: "#b91c1c",
    title: "Emerging",
    description: "Every small action counts. We’ll guide you toward a stronger footing one step at a time.",
  },
};

export default function ResultsPage() {
  const params = useSearchParams();

  const score = Number(params.get("score")) || 0;
  const dti = Number(params.get("dti")) || 0;
  const emergencyMonths = Number(params.get("emergencyMonths")) || 0;
  const savingsProgress = Number(params.get("savingsProgress")) || 0;
  const creditUtilization = Number(params.get("creditUtilization")) || 0;

  const recommendations = buildRecommendations(dti, emergencyMonths, savingsProgress, creditUtilization);
  const improvementSteps = recommendations.slice(0, 3);

  const hasScore = params.get("score");
  if (!hasScore) {
    return (
      <main className="page">
        <section className="section">
          <div className="card" style={{ display: "grid", gap: 20 }}>
            <h1 className="heading" style={{ fontSize: "clamp(30px, 5vw, 42px)", margin: 0 }}>
              We’ll build your results together
            </h1>
            <p className="lead" style={{ margin: 0 }}>
              Share a few details in the assessment and we’ll craft personalized insights just for you.
            </p>
            <Link href="/assess" className="btn-primary" style={{ width: "fit-content" }}>
              Begin my checkup
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const zone = scoreToBand(score);
  const zoneInfo = zoneDetails[zone] ?? zoneDetails.Emerging;

  return (
    <main className="page">
      <section className="section">
        <div className="card" style={{ display: "grid", gap: 24 }}>
          <div style={{ display: "grid", gap: 18 }}>
            <h1 className="heading" style={{ margin: 0 }}>Your Financial Health checkup</h1>
            <p className="lead" style={{ margin: 0 }}>
              Here’s how your money picture looks today, plus gentle recommendations to keep your momentum going.
            </p>
          </div>

          <div className="stat-grid columns-2" style={{ gap: 24, alignItems: "center" }}>
            <div style={{ display: "grid", gap: 18 }}>
              <div className="score-circle">{score}</div>
              <div>
                <span className="zone-pill" style={{ background: `${zoneInfo.tone}22`, color: zoneInfo.tone }}>
                  {zoneInfo.title} zone
                </span>
                <p style={{ marginTop: 12, color: "var(--muted)", marginBottom: 0 }}>{zoneInfo.description}</p>
              </div>
            </div>

            <div className="card" style={{ display: "grid", gap: 16, boxShadow: "none", border: `1px solid ${zoneInfo.tone}33` }}>
              <h2 style={{ margin: 0, fontSize: "1.25rem" }}>Snapshot of your numbers</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                <li style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <span style={{ color: "var(--muted)" }}>Debt-to-income</span>
                  <strong>{Math.round(dti * 100)}%</strong>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <span style={{ color: "var(--muted)" }}>Emergency savings coverage</span>
                  <strong>{emergencyMonths.toFixed(1)} months</strong>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <span style={{ color: "var(--muted)" }}>Savings progress</span>
                  <strong>{Math.round(savingsProgress * 100)}%</strong>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <span style={{ color: "var(--muted)" }}>Credit utilization</span>
                  <strong>{Math.round(creditUtilization)}%</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ display: "grid", gap: 20 }}>
          <h2 style={{ margin: 0, fontSize: "1.35rem" }}>Personalized recommendations</h2>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            These steps are based on what you shared. Tackle one at a time and celebrate progress along the way.
          </p>
          <ul className="tip-list" style={{ margin: 0 }}>
            {recommendations.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ display: "grid", gap: 18 }}>
          <h2 style={{ margin: 0, fontSize: "1.3rem" }}>See how to improve</h2>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Start with small actions that fit your life. Consistency beats perfection—Connections CU is here to support you.
          </p>
          <ul style={{ listStyle: "decimal", paddingLeft: 22, display: "grid", gap: 10, margin: 0 }}>
            {improvementSteps.map((step) => (
              <li key={step} style={{ color: "var(--muted)" }}>
                {step}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/assess" className="btn-primary">
              Start a new checkup
            </Link>
            <Link href="/" className="btn-secondary">
              Return home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
