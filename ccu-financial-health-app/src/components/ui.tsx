"use client";
import clsx from "clsx";
import { ReactNode } from "react";

export function Container({className,children}:{className?:string;children:ReactNode}){
  return <div className={clsx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",className)}>{children}</div>;
}

export function Card({className,children}:{className?:string;children:ReactNode}){
  return (
    <div className={clsx(
      "rounded-2xl border border-[var(--line)] bg-[var(--card)]/95 shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:shadow-md",
      className
    )}>
      {children}
    </div>
  );
}

export function Button(
  {className,children,variant="primary",...props}:
  React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?:"primary"|"outline"|"ghost"}
){
  const base="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2";
  const styles=variant==="primary"
    ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-700)] focus-visible:ring-[var(--ring)]"
    : variant==="outline"
      ? "border border-[var(--line)] text-[var(--ink)] bg-white hover:bg-[var(--bg-soft)] focus-visible:ring-[var(--ring)]"
      : "text-[var(--accent)] hover:bg-[var(--bg-soft)]";
  return <button className={clsx(base,styles,className)} {...props}>{children}</button>;
}

export function SectionTitle({kicker,children}:{kicker?:string;children:ReactNode}){
  return (
    <div>
      {kicker && <div className="text-xs uppercase tracking-wide text-[var(--accent)]">{kicker}</div>}
      <h1 className="mt-1 text-3xl font-semibold">{children}</h1>
    </div>
  );
}

export function Field(
  {label,hint,type="text",...props}:
  React.InputHTMLAttributes<HTMLInputElement> & {label:string;hint?:string}
){
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        className="mt-1 w-full rounded-md border border-[var(--line)] bg-white px-3 py-2 text-[var(--ink)] placeholder-[#9FB4C8] shadow-sm focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--ring)] outline-none"
        {...props}
      />
      {hint && <span className="mt-1 block text-xs text-[var(--sub)]">{hint}</span>}
    </label>
  );
}
