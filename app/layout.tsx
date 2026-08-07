import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/seed";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const body = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} | Servis i specializuar Volvo në Kosovë`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Servis i dedikuar vetëm për automjetet Volvo në Fushë Kosovë, Uglarë. Diagnostikim, mirëmbajtje dhe riparim profesional.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/brand/logo.png", type: "image/png", sizes: "438x438" },
    ],
    shortcut: "/favicon.png",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq" className={`${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
