import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS Week 2026",
  description: "CS Week 2026 — Let the Games Begin!",
  icons: {
    icon: "/icon.png", // Reference the file in the /public directory
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
