import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  title: "Connections CU · Financial Wellness",
  description: "Simple tools, transparent products, real support.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const LangToggle = <LanguageToggle />;
  return (
    <html lang="en">
      <body>
        <div className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
          <Nav langToggle={LangToggle} />
        </div>
        <main className="container-page section-gap">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
