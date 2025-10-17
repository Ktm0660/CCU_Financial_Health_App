import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Connections CU · Financial Wellness",
  description: "Simple tools, transparent products, real support.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="nav-wrap">
          <div className="nav">
            <Link href="/" className="font-serif text-xl">Connections CU</Link>
            <Link href="/assess">Assessment</Link>
            <Link href="/products">Products</Link>
            <Link href="/learn">Learn</Link>
            <Link href="/?lang=es" className="lang pill">ES</Link>
          </div>
        </div>
        <main className="container-page section-gap">{children}</main>
        <footer className="container-page text-sm text-slate-500 py-10">
          © 2025 Connections Credit Union · NCUA · EHL
        </footer>
      </body>
    </html>
  );
}
