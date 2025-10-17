import type { ReactNode } from "react";

export default function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm ${className}`}>
      {children}
    </div>
  );
}
