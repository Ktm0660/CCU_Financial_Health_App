import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connections CU · Financial Wellness",
  description: "Simple steps, transparent options, and caring guidance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white/70 backdrop-blur sticky top-0 z-50 border-b border-brand-ring">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="text-brand-navy font-semibold tracking-wide">
              Connections CU · Financial Wellness
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-brand-teal">Home</Link>
              <Link href="/assess" className="hover:text-brand-teal">Assessment</Link>
              <Link href="/products" className="hover:text-brand-teal">Products</Link>
              <Link href="/resources" className="hover:text-brand-teal">Resources</Link>
              <Link href="?lang=es" className="text-xs px-2 py-1 rounded-md border border-brand-ring hover:bg-brand-sky">ES</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-16 border-t border-brand-ring bg-white">
          <div className="container py-8 text-sm text-slate-600">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p>© {new Date().getFullYear()} Connections Credit Union — All rights reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-brand-teal">Privacy</Link>
                <Link href="/contact" className="hover:text-brand-teal">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
