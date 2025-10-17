"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/assess", label: "Assessment" },
  { href: "/products", label: "Products" },
  { href: "/learn", label: "Learn" },
];

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav className="nav" style={{ display: "flex", gap: ".25rem" }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
