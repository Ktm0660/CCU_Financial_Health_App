import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connections CU • Financial Wellness Companion',
  description: 'Build financial confidence with clear steps, tools, and real human help.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-row">
            <a className="brand" href="/">Connections CU</a>
            <nav className="nav">
              <a href="/assess">Assessment</a>
              <a href="/learn">Learn</a>
              <a href="/grow">Grow</a>
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
