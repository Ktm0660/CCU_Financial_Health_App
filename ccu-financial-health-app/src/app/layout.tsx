import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import { Container } from "@/components/ui";
import LanguageToggle from "@/components/LanguageToggle";
import { t } from "@/lib/i18n";

export const metadata = {
  title: "Connections CU · Financial Wellness",
  description: "Simple steps, transparent options, caring guidance.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="h-1 w-full bg-[var(--accent)]" />
        <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/90 backdrop-blur">
          <Container className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-block h-8 w-8 rounded-md bg-[var(--accent)]" />
              <span className="text-base font-semibold tracking-tight">Connections Credit Union</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm sm:gap-6">
              <Link className="hover:underline" href="/">
                {t("nav.home")}
              </Link>
              <Link className="hover:underline" href="/assess">
                {t("nav.assess")}
              </Link>
              <Link className="hover:underline" href="/products">
                {t("nav.products")}
              </Link>
              <Link className="hover:underline" href="/resources">
                {t("nav.resources")}
              </Link>
              <LanguageToggle />
            </nav>
          </Container>
        </header>
        <main>
          <Container className="py-10">{children}</Container>
        </main>
        <footer className="mt-16 border-t border-[var(--line)] bg-white/90">
          <Container className="py-8 text-sm text-[var(--ink-2)]">
            © {new Date().getFullYear()} Connections Credit Union — {t("footer.rights")}
          </Container>
        </footer>
      </body>
    </html>
  );
}
