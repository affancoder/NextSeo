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
  metadataBase: new URL("https://next-seo-demo.vercel.app"),
  title: {
    default: "NextSEO | Modern Next.js Starter",
    template: "%s | NextSEO",
  },
  description: "A high-performance Next.js App Router starter with TypeScript, Tailwind CSS, and SEO best practices built-in.",
  openGraph: {
    title: "NextSEO | Modern Next.js Starter",
    description: "A high-performance Next.js App Router starter with TypeScript, Tailwind CSS, and SEO best practices built-in.",
    url: "https://next-seo-demo.vercel.app",
    siteName: "NextSEO",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextSEO | Modern Next.js Starter",
    description: "A high-performance Next.js App Router starter with TypeScript, Tailwind CSS, and SEO best practices built-in.",
    creator: "@nextseo",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
