const lessons = [
  { title: 'Build your first cushion', minutes: 3, summary: 'Start with $20–$50 and automate it. Small > perfect.' },
  { title: 'Debt that helps vs hurts', minutes: 4, summary: 'Understand interest, fees, and right-sized payments.' },
  { title: 'Credit utilization, explained', minutes: 2, summary: 'Why 30% matters and how to stay under it.' },
  { title: 'Banking with an ITIN', minutes: 3, summary: 'Safe accounts and credit for every neighbor.' },
];

export default function LearnPage() {
  return (
    <section>
      <h1 className="h1">Learn — tiny lessons</h1>
      <p className="lede">Plain language, built for real life. No tests. Just tips you can use today.</p>
      <div className="grid">
        {lessons.map((l,i)=>(
          <article key={i} className="card">
            <h3>{l.title}</h3>
            <p className="note">{l.summary}</p>
            <p className="badge">{l.minutes} min</p>
          </article>
        ))}
      </div>
    </section>
  );
}
