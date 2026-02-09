import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const mukta = Syne({
  variable: "--font-geist-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Your CR - Simplified Class Management",
    template: "%s | Your CR",
  },
  description:
    "The ultimate platform for Class Representatives to manage routines, notices, and student activities efficiently.",
  keywords: [
    "Class Representative",
    "CR",
    "Student Management",
    "Academic Planner",
    "Routine Management",
    "Notice Board",
    "Your CR",
  ],
  authors: [{ name: "Rakib Islam", url: "https://yourcr.com" }],
  creator: "Rakib Islam",
  publisher: "Your CR Team",
  manifest: "/manifest.json",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourcr.com",
    siteName: "Your CR",
    title: "Your CR - Empowering Class Representatives",
    description:
      "Manage your class like a pro. Routines, assignments, and notices - all in one place.",
    images: [
      {
        url: "https://yourcr.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your CR Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your CR - Simplified Class Management",
    description:
      "The best tool for CRs to organize their classroom efficiently.",
    images: ["https://yourcr.com/twitter-image.png"],
    creator: "@yourcr_official",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1132020137464868" />
      </head>
      <body className={`${mukta.className}`} suppressHydrationWarning>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
