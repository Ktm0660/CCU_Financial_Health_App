import Link from "next/link";
import { Card, Button } from "@/components/ui";
import { t } from "@/lib/i18n";

export default function Home() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="p-8">
        <span className="text-xs uppercase tracking-wide text-[var(--accent)]">Connections CU</span>
        <h1 className="mt-2 text-4xl font-semibold leading-tight">{t("hero.title")}</h1>
        <p className="mt-3 text-lg text-[var(--ink-2)]">{t("hero.subtitle")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/assess">
            <Button>{t("cta.start")}</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline">{t("products.title")}</Button>
          </Link>
        </div>
        <ul className="mt-6 grid gap-2 text-sm text-[var(--ink-2)] sm:grid-cols-2">
          <li>• Transparent pricing</li>
          <li>• Judgment-free guidance</li>
          <li>• ITIN lending options</li>
          <li>• Mobile unit for rural areas</li>
        </ul>
      </Card>

      <Card className="p-8">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <ol className="mt-4 space-y-3 text-[var(--ink-2)]">
          <li>
            <span className="font-medium text-[var(--ink)]">1.</span> Take a quick, plain-language checkup.
          </li>
          <li>
            <span className="font-medium text-[var(--ink)]">2.</span> See simple steps and trusted tools.
          </li>
          <li>
            <span className="font-medium text-[var(--ink)]">3.</span> Connect with a counselor when you’re ready.
          </li>
        </ol>
      </Card>
    </div>
  );
}
