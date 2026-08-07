import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { SITE } from "@/lib/seed";
import { getDictionary } from "@/lib/i18n";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://vol-ks.com";

export const GEO = {
  latitude: 42.618719,
  longitude: 21.108545,
  streetAddress: "Uglarë",
  addressLocality: "Fushë Kosovë",
  addressRegion: "Kosovë",
  addressCountry: "XK",
  postalCode: "",
} as const;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const path = locale === "sq" ? "/" : "/en";
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl("/brand/hero-volvo.jpg");

  const keywords =
    locale === "sq"
      ? [
          "servis Volvo",
          "Volvo Kosovë",
          "servis Volvo Fushë Kosovë",
          "VOL-KS Service",
          "diagnostikim Volvo",
          "mirëmbajtje Volvo",
          "riparim Volvo",
          "auto servis Uglarë",
          "Volvo service Kosovo",
        ]
      : [
          "Volvo service Kosovo",
          "Volvo workshop Fushë Kosovë",
          "VOL-KS Service",
          "Volvo diagnostics",
          "Volvo maintenance",
          "Volvo repair Kosovo",
          "auto service Uglarë",
          "specialized Volvo service",
        ];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: `%s | ${SITE.name}`,
    },
    description: dict.meta.description,
    keywords,
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE_URL }],
    creator: SITE.name,
    publisher: SITE.name,
    category: "Automotive",
    alternates: {
      canonical: url,
      languages: {
        sq: absoluteUrl("/"),
        en: absoluteUrl("/en"),
        "x-default": absoluteUrl("/"),
      },
    },
    openGraph: {
      type: "website",
      url,
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: SITE.name,
      locale: locale === "sq" ? "sq_AL" : "en_US",
      alternateLocale: locale === "sq" ? ["en_US"] : ["sq_AL"],
      images: [
        {
          url: ogImage,
          width: 1920,
          height: 1080,
          alt: `${SITE.name} — Volvo service`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [ogImage],
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
    icons: {
      icon: [
        { url: "/icon.png", type: "image/png", sizes: "192x192" },
        { url: "/brand/logo.png", type: "image/png", sizes: "438x438" },
      ],
      shortcut: "/favicon.png",
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    other: {
      "geo.region": "XK",
      "geo.placename": "Fushë Kosovë",
      "geo.position": `${GEO.latitude};${GEO.longitude}`,
      ICBM: `${GEO.latitude}, ${GEO.longitude}`,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness", "AutomotiveBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    legalName: SITE.name,
    url: SITE_URL,
    telephone: SITE.phone,
    image: [
      absoluteUrl("/brand/logo.png"),
      absoluteUrl("/brand/hero-volvo.jpg"),
    ],
    logo: absoluteUrl("/brand/logo.png"),
    description:
      "Specialized Volvo service in Fushë Kosovë, Uglarë. Advanced diagnostics, maintenance, and repair for Volvo vehicles only.",
    address: {
      "@type": "PostalAddress",
      streetAddress: GEO.streetAddress,
      addressLocality: GEO.addressLocality,
      addressRegion: GEO.addressRegion,
      addressCountry: GEO.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: SITE.mapsLink,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    sameAs: [SITE.facebook, SITE.instagram],
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Kosovo",
      },
      {
        "@type": "City",
        name: "Fushë Kosovë",
      },
      {
        "@type": "City",
        name: "Prishtinë",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Card",
    brand: {
      "@type": "Brand",
      name: "Volvo",
    },
    knowsAbout: [
      "Volvo diagnostics",
      "Volvo maintenance",
      "Volvo brake service",
      "Volvo engine service",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    inLanguage: ["sq", "en"],
    publisher: {
      "@id": `${SITE_URL}/#business`,
    },
  };
}
