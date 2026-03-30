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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://slambook.app';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Slambook - Let them spill",
    template: "%s | Slambook",
  },
  description: "Find out what your friends really think about you. Create a slam book, share the link, and discover the truth.",
  keywords: ["slambook", "friends", "social", "questions", "anonymous", "fun", "quiz"],
  authors: [{ name: "Slambook" }],
  creator: "Slambook",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Slambook",
    title: "Slambook - Let them spill",
    description: "Find out what your friends really think about you. Create a slam book, share the link, and discover the truth.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Slambook - Let them spill",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slambook - Let them spill",
    description: "Find out what your friends really think about you.",
    images: ["/og-image.svg"],
    creator: "@slambook",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div id="page-transition" className="page-transition-overlay" />
        {children}
      </body>
    </html>
  );
}
