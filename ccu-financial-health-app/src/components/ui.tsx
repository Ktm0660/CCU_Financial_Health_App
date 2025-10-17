"use client";
import clsx from "clsx";
import { ReactNode } from "react";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-[#E6EEF7] bg-white/95 shadow-sm ring-1 ring-black/5 backdrop-blur",
        "transition hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Button({
  className,
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" }) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2";
  const styles =
    variant === "primary"
      ? "bg-[#2E6D8A] text-white hover:bg-[#25566D] focus-visible:ring-[#2E6D8A]"
      : "border border-[#E6EEF7] text-[#0B2E4E] bg-white hover:bg-[#F5F9FF] focus-visible:ring-[#2E6D8A]";
  return (
    <button className={clsx(base, styles, className)} {...props}>
      {children}
    </button>
  );
}

export function SectionTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <div className="mb-4">
      {kicker ? <div className="text-xs uppercase tracking-wide text-[#2E6D8A]">{kicker}</div> : null}
      <h1 className="mt-1 text-3xl font-semibold text-[#0B2E4E]">{children}</h1>
    </div>
  );
}

export function Field({
  label,
  hint,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[#0B2E4E]">{label}</span>
      <input
        className="mt-1 w-full rounded-md border border-[#E6EEF7] bg-white px-3 py-2 text-[#0B2E4E] placeholder-[#98AEC2] shadow-sm focus:border-[#2E6D8A] focus:ring-2 focus:ring-[#9CC6DA] outline-none"
        {...props}
      />
      {hint ? <span className="mt-1 block text-xs text-[#335E7E]">{hint}</span> : null}
    </label>
  );
}
