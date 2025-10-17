import React from "react";

type Props = React.PropsWithChildren<{ title: string; eyebrow?: string }>;

export default function SectionCard({ title, eyebrow, children }: Props) {
  return (
    <article className="card card-pad space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-navy/60">{eyebrow}</p>
      ) : null}
      <h3 className="text-xl font-semibold text-brand-navy">{title}</h3>
      <p className="text-base text-brand-navy/80">{children}</p>
    </article>
  );
}
