/**
 * @file layout.tsx
 * @description Root layout for the oh-my-copilot Next.js application.
 * Applies Geist fonts and wraps every page with the Navbar and Footer.
 * The site is dark-only, so no runtime theme switching is used.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "oh-my-copilot",
    template: "%s | oh-my-copilot",
  },
  description:
    "A tech blog for frontend developers. Covering JavaScript, TypeScript, React, and modern web development.",
};

interface RootLayoutProps {
  /** Page content passed in by the Next.js App Router. */
  readonly children: React.ReactNode;
}

/**
 * @description Root layout applied to every route. Sets up fonts and wraps the
 * page tree with Navbar and Footer while forcing dark theme at the document level.
 * @param props - {@link RootLayoutProps}
 * @returns The full HTML document shell.
 */
export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-theme="dark"
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex flex-1 flex-col pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
