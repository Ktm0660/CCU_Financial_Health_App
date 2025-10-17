"use client";

import React from "react";

export default function Bar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value || 0));
  return (
    <div className="h-2 w-full rounded-full bg-brand-soft">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-brand-navy to-brand-teal transition-[width]"
        style={{ width: `${pct}%` }}
        aria-hidden
      />
    </div>
  );
}
