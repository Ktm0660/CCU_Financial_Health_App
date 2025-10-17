import React from 'react';
export default function Container({ children, className = '' }: React.PropsWithChildren<{className?: string}>) {
  return <div className={`mx-auto max-w-2xl lg:max-w-5xl px-4 sm:px-6 ${className}`}>{children}</div>;
}
