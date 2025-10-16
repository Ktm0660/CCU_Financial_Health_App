import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Connections CU · Financial Wellness",
  description: "Simple tools, transparent products, and real help.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white border-b">
          <div className="container-page py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-brand-navy">
              Connections CU · Financial Wellness
            </Link>
            <nav className="flex gap-5 text-sm sm:text-base">
              <Link className="text-brand-navy hover:underline" href="/assess">Assessment</Link>
              <Link className="text-brand-navy hover:underline" href="/products">Products</Link>
              <Link className="text-brand-navy hover:underline" href="/learn">Learn</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 container-page py-8">{children}</main>
        <footer className="mt-12 border-t">
          <div className="container-page py-6 text-sm text-brand-gray">
            Built for rural and underserved communities · Transparent · Supportive · Human
          </div>
        </footer>
      </body>
    </html>
  );
}
