/**
 * @file layout.tsx
 * @description Root layout for the oh-my-copilot Next.js application.
 * Applies Geist fonts, injects an anti-flash theme script, and wraps every page
 * with the ThemeProvider, Navbar, and Footer.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
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

/**
 * Inline script that runs synchronously before React hydration to prevent theme flash.
 * Reads the stored preference from localStorage and sets `data-theme` on `<html>`.
 * Defaults to dark when no preference is stored.
 */
const ANTI_FLASH_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light')}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

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
 * @description Root layout applied to every route. Sets up fonts, injects the
 * anti-flash script, and wraps the page tree with ThemeProvider, Navbar, and Footer.
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
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Prevents light/dark flash by applying data-theme before React hydration */}
        <script dangerouslySetInnerHTML={{ __html: ANTI_FLASH_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex flex-1 flex-col pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
