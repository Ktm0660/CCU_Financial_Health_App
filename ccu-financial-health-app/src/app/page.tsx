import Link from "next/link";

export default function Home() {
  return (
    <main className="page">
      <section className="section">
        <div>
          <p style={{ color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Financial Wellness Companion
          </p>
          <h1 className="heading">Let&apos;s build your financial confidence.</h1>
          <p className="lead">
            Connections Credit Union&apos;s Financial Health platform helps you understand and grow your financial well-being.
            We pair compassionate guidance with actionable insights so you know exactly what to do next.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 24 }}>
          <Link className="btn-primary" href="/assess">
            Begin My Checkup
          </Link>
          <Link className="btn-secondary" href="/assess">
            Explore the assessment
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="card" style={{ display: "grid", gap: 18 }}>
          <h2 style={{ fontSize: "1.4rem", margin: 0 }}>A calm place to check in on your money</h2>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            We walk you through income, expenses, savings, and credit in just a few minutes. You&apos;ll receive a personalized score,
            see which zone you&apos;re in, and discover simple steps to improve.
          </p>
          <ul className="tip-list" style={{ margin: 0 }}>
            <li>Quick checkup with supportive language</li>
            <li>Tailored score using your own numbers</li>
            <li>Friendly recommendations from Connections CU experts</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
