"use client";
import Link from "next/link";
import { Card, Button } from "@/components/ui";
import { t } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-client";

export default function Home() {
  useLocale();
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="p-8">
        <h1 className="text-4xl font-semibold">{t("hero.title")}</h1>
        <p className="mt-3 text-lg text-[#335E7E]">{t("hero.subtitle")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/assess">
            <Button>{t("cta.start")}</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline">{t("products.title")}</Button>
          </Link>
        </div>
        <ul className="mt-6 grid gap-2 text-sm text-[#335E7E] sm:grid-cols-2">
          <li>• Transparent pricing</li>
          <li>• Judgment-free guidance</li>
          <li>• ITIN lending options</li>
          <li>• Mobile unit for rural areas</li>
        </ul>
      </Card>

      <Card className="relative overflow-hidden p-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#9CC6DA] via-transparent to-transparent opacity-30" />
        <div className="p-8">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-4 space-y-3 text-[#335E7E]">
            <li><span className="font-medium text-[#0B2E4E]">1.</span> Take a quick, plain-language checkup.</li>
            <li><span className="font-medium text-[#0B2E4E]">2.</span> See simple steps and trusted tools.</li>
            <li><span className="font-medium text-[#0B2E4E]">3.</span> Connect with a counselor when you’re ready.</li>
          </ol>
        </div>
      </Card>
    </div>
  );
}
