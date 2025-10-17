import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionCard from "@/components/SectionCard";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <section>
        <Container className="space-y-6">
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
            <SectionCard title="Simple">Plain language and small steps you can use today.</SectionCard>
            <SectionCard title="Transparent">Upfront about costs, terms, and how each product helps.</SectionCard>
            <SectionCard title="Supportive">Certified counselors, a mobile unit, and a community-first approach.</SectionCard>
          </div>
          <div className="card card-pad sm:p-6">
            <div className="space-y-3">
              <h2 className="section-title sm:text-4xl">Ready when you are.</h2>
              <p className="section-sub text-base">
                Answer a few questions and see small, doable next steps tailored to you.
              </p>
              <div className="flex flex-wrap gap-3 sm:flex-nowrap">
                <Link href="/assess" className="btn-primary min-w-[48%] sm:min-w-[0]">
                  Start the assessment
                </Link>
                <Link href="/learn" className="btn-ghost min-w-[48%] sm:min-w-[0]">
                  Learn how it works
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
