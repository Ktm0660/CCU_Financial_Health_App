import "./globals.css";
import type { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata = {
  title: "Connections CU · Financial Wellness",
  description: "Simple steps. Transparent options. Caring guidance.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <NavBar />
          <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
