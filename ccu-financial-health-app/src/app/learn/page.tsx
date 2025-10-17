import Container from "@/components/Container";

export default function LearnPage() {
  return (
    <Container>
      <div className="card card-pad sm:p-6 space-y-3">
        <h1 className="section-title sm:text-4xl">Learn</h1>
        <p className="section-sub max-w-prose text-base">
          Plain-language guides on budgeting, debt, saving, credit, and safety. We’re building bite-sized lessons, checklists, and printable handouts for counselors and our mobile unit.
        </p>
      </div>
    </Container>
  );
}
