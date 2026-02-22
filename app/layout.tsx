import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Raphael Samuel — Fullstack Developer",
  description: "Fullstack developer specialising in backends that scale and frontends that ship. 6 years of code, 18 years old.",
  keywords: ["Fullstack Developer", "Next.js", "TypeScript", "Go", "PHP", "PostgreSQL"],
  authors: [{ name: "Raphael Samuel", url: "https://github.com/var-raphael" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/portfolio-images/img/avatar.jpg",
    apple: "/portfolio-images/img/avatar.jpg",
  },
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
      <head>
        <meta name="theme-color" content="#0e0d0c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Raphael Samuel" />
        <link rel="apple-touch-icon" href="/portfolio-images/img/avatar.jpg" />
      </head>
      <body>
        {children}
        <Script
          src="https://phantomtrack-cdn.vercel.app/phantom.v1.0.0.js?trackid=track_wn48o57cfg7ytynr7355sd"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
