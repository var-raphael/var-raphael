import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = "https://var-raphael.vercel.app";
const OG_IMAGE = "/portfolio-images/img/og-image.jpg"; // 1200x630 recommended, drop your file at this path

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Raphael Samuel, Software Engineer",
  description: "Software engineer building AI agent tooling and data infrastructure end to end. Two of my own startups, plus client work, across Python, Go, TypeScript, and Next.js.",
  keywords: ["Software Engineer", "AI Agent Tooling", "Data Infrastructure", "Next.js", "TypeScript", "Go", "Python", "PostgreSQL", "MySQL"],
  authors: [{ name: "Raphael Samuel", url: "https://github.com/var-raphael" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/portfolio-images/img/avatar.jpg",
    apple: "/portfolio-images/img/avatar.jpg",
  },
  openGraph: {
    title: "Raphael Samuel, Software Engineer",
    description: "Software engineer building AI agent tooling and data infrastructure end to end. Two of my own startups, plus client work.",
    url: SITE_URL,
    siteName: "Raphael Samuel",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Raphael Samuel, Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael Samuel, Software Engineer",
    description: "Software engineer building AI agent tooling and data infrastructure end to end. Two of my own startups, plus client work.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Raphael Samuel" />
        <link rel="apple-touch-icon" href="/portfolio-images/img/avatar.jpg" />
      </head>
      <body>
        {children}
        <Analytics />
        <Script
          src="https://gnat-np2m.onrender.com/tracker.js"
          data-site-key="60186c0903288b1cfb491bc72f12b8fa36d24e0981847b71"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
