import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Connections CU | Financial Wellness Companion',
  description: 'Friendly tools and education for your financial health.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-brand-ink">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container-pro flex items-center justify-between py-3">
            <Link href="/" className="font-semibold text-brand-navy text-lg">Connections CU</Link>
            <nav className="flex gap-5 text-sm">
              <Link href="/assess" className="hover:text-brand-blue">Assessment</Link>
              <Link href="/learn" className="hover:text-brand-blue">Learn</Link>
              <a href="https://www.connectidaho.org" className="text-brand-blue">Main Site</a>
            </nav>
            <a href="https://www.connectidaho.org/apply" className="btn-primary">Join</a>
          </div>
        </header>
        <main className="container-pro py-10">{children}</main>
        <footer className="border-t border-black/5 bg-white mt-10">
          <div className="container-pro py-6 text-sm text-brand-stone">
            Serving Idaho’s rural and underserved communities with care.
          </div>
        </footer>
      </body>
    </html>
  )
}
