"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/assess", label: "Assessment" },
  { href: "/learn", label: "Learn" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="nav-logo" aria-label="Connections Credit Union home">
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--brand), var(--accent))",
              marginRight: 12,
              verticalAlign: "middle",
            }}
          />
          <span style={{ verticalAlign: "middle" }}>Connections CU</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={isActive ? { background: "rgba(37, 99, 235, 0.16)", color: "var(--brand)" } : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
