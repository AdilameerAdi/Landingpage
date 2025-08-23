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

export const metadata = {
  title: {
    default: "My Agency | United by sound",
    template: "%s | My Agency",
  },
  description:
    "Independent music label and agency. United by sound, lifted by rhythm.",
  metadataBase: new URL("https://example.com"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "My Agency | United by sound",
    description:
      "Independent music label and agency. United by sound, lifted by rhythm.",
    url: "/",
    siteName: "My Agency",
    images: [
      { url: "/gallery/img1.jpg", width: 1200, height: 630, alt: "My Agency" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Agency | United by sound",
    description:
      "Independent music label and agency. United by sound, lifted by rhythm.",
    images: ["/gallery/img1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only absolute left-2 top-2 z-50 bg-white text-black px-3 py-2 rounded">Skip to content</a>
        <main id="main-content" role="main">
          {children}
        </main>
      </body>
    </html>
  );
}
