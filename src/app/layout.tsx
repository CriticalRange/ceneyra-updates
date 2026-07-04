import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ceneyra Inner — Güncellemeler",
  description:
    "Ceneyra Inner için en son güncellemeleri indirin. Windows için hafif ve hızlı içerik yönetim aracı.",
  keywords: ["Ceneyra", "Inner", "download", "updates", "Windows"],
  openGraph: {
    title: "Ceneyra Inner — Güncellemeler",
    description:
      "Ceneyra Inner için en son güncellemeleri indirin. Windows için hafif ve hızlı içerik yönetim aracı.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
