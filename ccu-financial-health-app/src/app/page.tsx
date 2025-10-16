export default function HomePage() {
  return (
    <section>
      <h1 className="h1">Financial Wellness Companion</h1>
      <p className="lede">
        A friendly way to build financial confidence — with clear steps, plain language, and real people who care.
      </p>

      <div className="grid">
        <div className="card">
          <h3>1) Take a 3-minute check-in</h3>
          <p className="note">A warm conversation about cash flow, safety cushion, and stress — not a test.</p>
          <a className="btn btn-primary" href="/assess">Start assessment</a>
        </div>
        <div className="card">
          <h3>2) Learn in small bites</h3>
          <p className="note">Tiny lessons with real-life tips for busy people.</p>
          <a className="btn" href="/learn">Explore lessons</a>
        </div>
        <div className="card">
          <h3>3) Grow with the right tools</h3>
          <p className="note">From ITIN lending to small-dollar loans and counseling — built for our community.</p>
          <a className="btn" href="/grow">See tools</a>
        </div>
      </div>
    </section>
  );
}
