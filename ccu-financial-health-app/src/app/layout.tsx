import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import { Container } from "@/components/ui";
import HeaderNav from "@/components/HeaderNav";
import { t } from "@/lib/i18n";

export const metadata = { title: "Connections Financial Wellness", description: "Feel confident with your money." };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-[#0B2E4E]">
        {/* Soft brand gradient background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#F5F9FF] via-white to-[#F5F9FF]" />
        {/* Top accent bar */}
        <div className="h-1 w-full bg-[#2E6D8A]" />
        <header className="sticky top-0 z-50 border-b border-[#E6EEF7] bg-white/90 backdrop-blur">
          <Container className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded-md bg-[#2E6D8A]" />
              <span className="text-base font-semibold tracking-tight">Connections Credit Union</span>
            </Link>
            <HeaderNav />
          </Container>
        </header>
        <main>
          <Container className="py-8">{children}</Container>
        </main>
        <footer className="mt-16 border-t border-[#E6EEF7] bg-white/90">
          <Container className="py-8 text-sm text-[#335E7E]">
            © {new Date().getFullYear()} Connections Credit Union — {t("footer.rights")}
          </Container>
        </footer>
      </body>
    </html>
  );
}
