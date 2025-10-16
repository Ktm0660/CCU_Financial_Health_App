import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h1 className="h1">Financial Wellness Companion</h1>
      <p className="lede">
        A friendly way to build financial confidence — with clear steps, plain language, and real people who care.
      </p>
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "16px",
        }}
      >
        <Link className="btn btn-primary" href="/assess">
          Take the Stability Check
        </Link>
        <Link className="btn" href="/resources">
          Resources
        </Link>
      </div>

      <div className="grid">
        <div className="card">
          <h3>1) Take a 3-minute check-in</h3>
          <p className="note">A warm conversation about cash flow, safety cushion, and stress — not a test.</p>
          <Link className="btn btn-primary" href="/assess">
            Start assessment
          </Link>
        </div>
        <div className="card">
          <h3>2) Learn in small bites</h3>
          <p className="note">Tiny lessons with real-life tips for busy people.</p>
          <Link className="btn" href="/learn">
            Explore lessons
          </Link>
        </div>
        <div className="card">
          <h3>3) Grow with the right tools</h3>
          <p className="note">From ITIN lending to small-dollar loans and counseling — built for our community.</p>
          <Link className="btn" href="/grow">
            See tools
          </Link>
        </div>
      </div>
    </section>
  );
}
