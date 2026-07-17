import type { Metadata } from "next";
import { Source_Sans_3, Unbounded } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  buildPersonJsonLd,
  buildWebsiteJsonLd,
  seo,
} from "@/lib/seo";
import { site } from "../../content/site";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const baseUrl = seo.baseUrl;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} | Creative Marketing Leader`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.shortName.replace(/\.$/, ""),
  authors: [{ name: site.name, url: baseUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [...seo.keywords],
  category: "Marketing",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: `${site.name} | Creative Marketing Leader`,
    description: site.description,
    url: baseUrl,
    siteName: `${site.name} | Gibby.`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/paul-gibson.png",
        width: 1200,
        height: 1500,
        alt: `${site.name}, creative marketing leader`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Creative Marketing Leader`,
    description: site.description,
    images: ["/images/paul-gibson.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "theme-color": "#c45d3a",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body
        className={`${sourceSans.className} flex min-h-full flex-col bg-[var(--bg)] text-[var(--ink)]`}
      >
        <JsonLd data={[buildPersonJsonLd(), buildWebsiteJsonLd()]} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
