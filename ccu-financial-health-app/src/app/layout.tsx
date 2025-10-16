import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Inter, DM_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });

export const metadata: Metadata = {
  title: "Connections CU · Financial Wellness",
  description: "Simple tools, transparent products, and real help.",
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="px-3 py-2 rounded-lg text-sm font-medium text-brand-navy hover:bg-brand-soft focus:shadow-focus"
  >
    {children}
  </Link>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dm.variable}`}>
      <body className="min-h-screen flex flex-col font-[var(--font-inter)]">
        <header className="sticky top-0 z-50 backdrop-blur bg-white/85 border-b border-brand-border">
          <div className="container-page h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold text-brand-navy tracking-tight">
              Connections CU · <span className="text-brand-blue">Financial Wellness</span>
            </Link>
            <nav className="flex items-center gap-1">
              <NavLink href="/assess">Assessment</NavLink>
              <NavLink href="/products">Products</NavLink>
              <NavLink href="/learn">Learn</NavLink>
            </nav>
          </div>
        </header>

        <main className="flex-1 container-page section">{children}</main>

        <footer className="border-t border-brand-border">
          <div className="container-page py-6 text-sm text-brand-gray">
            Built for rural and underserved communities · Transparent · Supportive · Human
          </div>
        </footer>
      </body>
    </html>
  );
}
