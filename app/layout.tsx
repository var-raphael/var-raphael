import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Raphael Samuel — Full-Stack Engineer",
  description: "Full-stack engineer building products end to end. Two of my own startups, plus client work, across Python, Go, TypeScript, and Next.js.",
  keywords: ["Full-Stack Engineer", "Next.js", "TypeScript", "Go", "Python", "PostgreSQL", "MySQL"],
  authors: [{ name: "Raphael Samuel", url: "https://github.com/var-raphael" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/portfolio-images/img/avatar.jpg",
    apple: "/portfolio-images/img/avatar.jpg",
  },
  openGraph: {
    title: "Raphael Samuel — Full-Stack Engineer",
    description: "Full-stack engineer building products end to end. Two of my own startups, plus client work.",
    url: "https://var-raphael.vercel.app",
    siteName: "Raphael Samuel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raphael Samuel — Full-Stack Engineer",
    description: "Full-stack engineer building products end to end. Two of my own startups, plus client work.",
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
        <meta name="theme-color" content="#0e0d0c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Raphael Samuel" />
        <link rel="apple-touch-icon" href="/portfolio-images/img/avatar.jpg" />
      </head>
      <body>
        {children}
        <Analytics />
        <Script
          src="https://phantomtrack-cdn.vercel.app/phantom.v1.0.0.js?trackid=track_wn48o57cfg7ytynr7355sd"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}