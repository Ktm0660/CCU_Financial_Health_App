import React from "react";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <nav style={{ padding: "1rem", background: "#f5f5f5" }}>
          <Link href="/assess">Assessment</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
