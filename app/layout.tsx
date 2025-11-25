import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Next.js 16 Template",
    template: "%s | Next.js 16 Template",
  },
  description:
    "A modern Next.js 16 starter template with React 19, TypeScript, Tailwind CSS v4, and Biome.",
  keywords: [
    "Next.js",
    "Next.js 16",
    "React",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "Biome",
    "Template",
    "Starter",
  ],

  openGraph: {
    title: "Next.js 16 Template",
    description:
      "A modern Next.js 16 starter template with React 19, TypeScript, Tailwind CSS v4, and Biome.",
    siteName: "Next.js 16 Template",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/social-card.jpg",
        width: 1200,
        height: 640,
        alt: "Next.js 16 Template - A modern starter with React 19, TypeScript, and Tailwind CSS v4",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js 16 Template",
    description:
      "A modern Next.js 16 starter template with React 19, TypeScript, Tailwind CSS v4, and Biome.",
    images: ["/social-card.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
