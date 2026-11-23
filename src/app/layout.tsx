import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const title = "Ceneyra Inner — Güncellemeler";
const description = "Ceneyra Inner için en son güncellemeleri indirin.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Ceneyra", "Inner", "download", "updates", "Windows"],
  openGraph: { title, description, type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
