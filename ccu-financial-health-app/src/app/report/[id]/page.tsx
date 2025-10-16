import { prisma } from "@/lib/db";

export default async function ReportPage({ params }: { params: { id: string } }) {
  const a = await prisma.assessment.findUnique({
    where: { id: params.id },
    include: { profile: true },
  });
  if (!a) return <main className="p-6">Report not found.</main>;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Your Financial Health Report</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <Card title="Financial Health Index">{a.fhiScore} / 100 ({a.band})</Card>
        <Card title="Debt-to-Income">{(a.dti * 100).toFixed(1)}%</Card>
        <Card title="Emergency Fund Coverage">{a.emergencyMonths.toFixed(2)} months</Card>
        <Card title="Savings Progress">{(a.savingsProgress * 100).toFixed(1)}%</Card>
        {a.creditUtil != null && <Card title="Credit Utilization">{(a.creditUtil * 100).toFixed(1)}%</Card>}
      </div>
      <section>
        <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
        <ul className="list-disc pl-6 space-y-1">
          {(a.recommendations as string[]).map((r, i) => <li key={i}>{r}</li>)}
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
