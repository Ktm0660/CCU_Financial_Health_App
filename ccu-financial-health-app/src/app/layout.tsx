import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { PrimaryNav } from "@/components/primary-nav";

export const metadata: Metadata = {
  title: "Connections CU · Financial Wellness",
  description: "Simple tools, transparent products, real support.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-shell">
          <header className="site-header">
            <div
              className="container-page"
              style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <Link
                  href="/"
                  className="brand"
                  aria-label="Connections Credit Union Home"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <defs>
                      <linearGradient
                        id="mark"
                        x1="4"
                        x2="20"
                        y1="4"
                        y2="20"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#1565C0" />
                        <stop offset="1" stopColor="#19A7CE" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#mark)" />
                    <path
                      d="M8 12h8M12 8v8"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Connections CU
                </Link>
                <PrimaryNav />
              </div>
            </div>
          </header>

          <main className="container-page section">{children}</main>

          <footer className="footer">
            <div
              className="container-page"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <span>© {new Date().getFullYear()} Connections Credit Union</span>
              <span>Federally insured by NCUA · Equal Housing Lender</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
