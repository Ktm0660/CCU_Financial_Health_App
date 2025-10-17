import React from "react";

type Props = React.PropsWithChildren<{ className?: string }>;

export default function Container({ children, className = "" }: Props) {
  const classes = ["container-page", "sm:px-6", className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}
