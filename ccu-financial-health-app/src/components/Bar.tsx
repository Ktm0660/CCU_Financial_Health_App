'use client';
import React from 'react';
export default function Bar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value || 0));
  return (
    <div className="h-2 w-full rounded-full bg-slate-200">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-[#1F63B6] to-[#27B0C7] transition-[width]"
        style={{ width: `${pct}%` }}
        aria-hidden
      />
    </div>
  );
}
