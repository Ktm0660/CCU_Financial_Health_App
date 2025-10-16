import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Connections CU • Financial Wellness Companion",
  description: "Build financial confidence with clear steps, tools, and real human help.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-row">
            <Link className="brand" href="/">
              Connections CU
            </Link>
            <nav className="nav">
              <Link href="/assess">Assess</Link>
              <Link href="/resources">Resources</Link>
              <Link href="/learn">Learn</Link>
              <Link href="/grow">Grow</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container small">
            © {new Date().getFullYear()} Connections Credit Union — Building financial confidence together.
          </div>
        </footer>
      </body>
    </html>
  );
}
