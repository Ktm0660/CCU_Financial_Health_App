import React from 'react';
export default function SectionCard({ icon, title, children }: React.PropsWithChildren<{icon?: React.ReactNode; title: string;}>) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-xl bg-[rgb(14,125,182,0.12)] flex items-center justify-center">
          {icon ?? <span className="text-[color:#0E7DB6]">✓</span>}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[color:#0D3554]">{title}</h3>
          <div className="mt-2 text-slate-600">{children}</div>
        </div>
      </div>
    </div>
  );
}
