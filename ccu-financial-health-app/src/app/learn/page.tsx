import Container from "@/components/Container";

export default function LearnPage() {
  return (
    <Container>
      <div className="card p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-[color:#0D3554]">Learn</h1>
        <p className="mt-3 text-slate-600 max-w-prose">
          Plain-language guides on budgeting, debt, saving, credit, and safety. We’re building bite-sized lessons, checklists, and printable handouts for counselors and our mobile unit.
        </p>
      </div>
    </Container>
  );
}
