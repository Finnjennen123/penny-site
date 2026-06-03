import type { Metadata } from "next";
import { Outfit, Quicksand } from "next/font/google";
import "./globals.css";

// Display + body fonts taken from the DSG Kids brand stack.
// Outfit stands in for the brand display face ("Rosa Bright") until the
// licensed font file is provided, then it becomes the fallback.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Penny - the money app made for kids",
  description:
    "Kids earn allowance from chores, split it across save, spend, invest, and give, then earn a real debit card. Parent guided. Join the waitlist.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png",   sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/icon-apple.png", sizes: "180x180", type: "image/png" },
    shortcut: "/favicon-32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${quicksand.variable}`}>
      <head>
        {/* Preload the hero card image — it's the LCP element on most viewports */}
        <link rel="preload" as="image" href="/penny-card.png" fetchPriority="high" />
        {/* Preload the Penny app icon used in both the phone and notifications */}
        <link rel="preload" as="image" href="/icon-512.png" />
      </head>
      <body className="min-h-[100dvh] overflow-x-hidden">{children}</body>
    </html>
  );
}
