import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raphael Samuel — Fullstack Developer",
  description: "Fullstack developer specialising in backends that scale and frontends that ship. 6 years of code, 18 years old.",
  keywords: ["Fullstack Developer", "Next.js", "TypeScript", "Go", "PHP", "PostgreSQL"],
  authors: [{ name: "Raphael Samuel", url: "https://github.com/var-raphael" }],
  openGraph: {
    title: "Raphael Samuel — Fullstack Developer",
    description: "Fullstack developer specialising in backends that scale and frontends that ship.",
    url: "https://var-raphael.vercel.app",
    siteName: "Raphael Samuel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael Samuel — Fullstack Developer",
    description: "Fullstack developer specialising in backends that scale and frontends that ship.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
