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
      <body className="bg-transparent">
        <Nav langToggle={LangToggle} />
        <main className="py-8 sm:py-12 space-y-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
