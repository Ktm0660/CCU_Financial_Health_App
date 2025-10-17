"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/assess", label: "Assessment" },
  { href: "/products", label: "Products" },
  { href: "/learn", label: "Learn" },
];

export default function Nav({ langToggle }: { langToggle?: React.ReactNode }) {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-brand-navy/10">
      <div className="container-page sm:px-6 flex h-14 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-semibold text-brand-navy">
          Connections CU
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-2 text-sm font-medium">
          {tabs.map((tab) => {
            const isActive = path === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`inline-flex min-h-[44px] items-center justify-center rounded-full px-3.5 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal/30 ${
                  isActive
                    ? "bg-brand-soft text-brand-navy shadow-[inset_0_0_0_1px_rgba(14,47,68,0.1)]"
                    : "text-brand-navy/70 hover:text-brand-navy hover:bg-brand-soft"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
          {langToggle ? <div className="shrink-0">{langToggle}</div> : null}
        </nav>
      </div>
    </header>
  );
}
