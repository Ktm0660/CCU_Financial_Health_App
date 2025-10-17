import { SectionTitle, Card, Button } from "@/components/ui";

export default function ResourcesPage() {
  return (
    <section className="space-y-6">
      <SectionTitle kicker="Learn">Resources</SectionTitle>
      <Card className="p-6">
        <p className="text-[#335E7E]">
          Plain-language articles and tools to help you feel confident with money.
        </p>
        <div className="mt-4">
          <a href="https://www.connectidaho.org/resources" target="_blank" className="no-underline">
            <Button>Open Resource Center</Button>
          </a>
        </div>
      </Card>
    </section>
  );
}
