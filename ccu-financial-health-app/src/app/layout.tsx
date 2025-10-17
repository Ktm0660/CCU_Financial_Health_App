import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import LayoutClient from "@/components/LayoutClient";

export const metadata: Metadata = {
  title: "Connections CU · Financial Wellness",
  description: "Simple tools, transparent products, real support.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
