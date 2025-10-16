export default function ReportPage({ searchParams }: { searchParams: { [k: string]: string | string[] | undefined } }) {
  const score = Number(searchParams.score ?? 0);
  const band = String(searchParams.band ?? "");
  const dti = Number(searchParams.dti ?? 0);
  const emerg = Number(searchParams.emerg ?? 0);
  const savings = Number(searchParams.savings ?? 0);
  const credit = searchParams.credit === "" ? null : Number(searchParams.credit ?? NaN);
  const recs = JSON.parse(decodeURIComponent(String(searchParams.recs ?? "[]"))) as string[];

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Your Financial Health Report</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <Card title="Financial Health Index">{score} / 100 ({band})</Card>
        <Card title="Debt-to-Income">{(dti * 100).toFixed(1)}%</Card>
        <Card title="Emergency Fund Coverage">{emerg.toFixed(2)} months</Card>
        <Card title="Savings Progress">{(savings * 100).toFixed(1)}%</Card>
        {credit != null && !Number.isNaN(credit) && <Card title="Credit Utilization">{(credit * 100).toFixed(1)}%</Card>}
      </div>
      <section>
        <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
        <ul className="list-disc pl-6 space-y-1">
          {recs.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </section>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded border p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-lg font-semibold">{children}</div>
    </div>
  );
}
