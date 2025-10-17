import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Connections CU · Financial Wellness",
  description: "Simple tools, transparent products, real support.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-shell">
          <header className="site-header">
            <div className="container-page" style={{paddingTop:"0.75rem",paddingBottom:"0.75rem"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem"}}>
                <Link href="/" className="brand" aria-label="Connections Credit Union Home">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="10" fill="var(--brand-blue)" />
                    <path d="M7 12h10M12 7v10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Connections CU
                </Link>
                <nav className="nav" style={{display:"flex",gap:".25rem"}}>
                  <Link href="/assess">Assessment</Link>
                  <Link href="/products">Products</Link>
                  <Link href="/learn">Learn</Link>
                </nav>
              </div>
              <div className="subnav">
                <Link href="/assess">Snapshot</Link>
                <Link href="/products">Low-cost options</Link>
                <Link href="/learn">Guides</Link>
              </div>
            </div>
          </header>

          <main className="container-page section">
            {children}
          </main>

          <footer className="footer">
            <div className="container-page" style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
              <span>© {new Date().getFullYear()} Connections Credit Union</span>
              <span>Federally insured by NCUA · Equal Housing Lender</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
