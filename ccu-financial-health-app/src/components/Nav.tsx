'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const tabs = [
  { href: '/', label: 'Home' },
  { href: '/assess', label: 'Assessment' },
  { href: '/products', label: 'Products' },
  { href: '/learn', label: 'Learn' },
];

export default function Nav({ langToggle }: { langToggle?: React.ReactNode }) {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/85 border-b border-slate-200/70 shadow-sm">
      <nav className="mx-auto max-w-2xl lg:max-w-5xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-[color:#0D3554] tracking-tight">
          Connections CU
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          {tabs.map(t => (
            <Link
              key={t.href}
              href={t.href}
              className={`inline-flex min-h-[44px] items-center justify-center rounded-full px-4 py-2 text-sm transition-colors ${
                path === t.href
                  ? 'bg-[rgb(14,125,182,0.12)] text-[color:#0D3554]'
                  : 'text-slate-600 hover:text-[color:#0D3554]'
              }`}
            >
              {t.label}
            </Link>
          ))}
          {langToggle}
        </div>
      </nav>
    </header>
  );
}
