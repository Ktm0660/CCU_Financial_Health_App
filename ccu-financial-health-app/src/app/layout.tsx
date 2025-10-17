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
        <Nav langToggle={LangToggle} />
        <main className="mx-auto max-w-2xl lg:max-w-5xl px-4 sm:px-6 py-6 sm:py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
