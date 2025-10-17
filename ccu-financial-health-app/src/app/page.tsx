import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionCard from "@/components/SectionCard";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="mt-8 sm:mt-10">
        <Container>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            <SectionCard title="Simple">Plain language and small steps you can use today.</SectionCard>
            <SectionCard title="Transparent">Upfront about costs, terms, and how each product helps.</SectionCard>
            <SectionCard title="Supportive">Certified counselors, a mobile unit, and a community-first approach.</SectionCard>
            <SectionCard title="Get started">Answer a few questions and see small, doable next steps.</SectionCard>
          </div>
        </Container>
      </section>
    </>
  );
}
