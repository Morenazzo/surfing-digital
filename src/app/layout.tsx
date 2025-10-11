// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { DM_Sans, Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "Surfing Digital - Discover Your Top 3 AI Projects",
  description:
    "Ride the AI Wave — from Idea to ROI. Discover your top 3 AI projects with measurable ROI in just 5 minutes.",
  keywords: ["AI", "artificial intelligence", "ROI", "business assessment", "AI projects", "digital transformation"],
  authors: [{ name: "Surfing Digital" }],
  creator: "Surfing Digital",
  publisher: "Surfing Digital",
  metadataBase: new URL("https://www.surfing.digital"),
  openGraph: {
    title: "Surfing Digital - Discover Your Top 3 AI Projects",
    description:
      "Ride the AI Wave — from Idea to ROI. Discover your top 3 AI projects with measurable ROI in just 5 minutes.",
    type: "website",
    locale: "en_US",
    siteName: "Surfing Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surfing Digital - Discover Your Top 3 AI Projects",
    description:
      "Ride the AI Wave — from Idea to ROI. Discover your top 3 AI projects with measurable ROI in just 5 minutes.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

// ← mueve themeColor aquí (ya no en metadata)
export const viewport: Viewport = {
  themeColor: "#0BB7B7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body 
          className={`${dmSans.variable} ${openSans.variable} antialiased`}
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
