import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import ModalRoot from "@/components/ModalRoot";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jodeschenes.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a60f5",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Jonathan Deschênes — Sites web et automatisation pour cabinets comptables",
    template: "%s · Jonathan Deschênes",
  },
  description:
    "Sites web professionnels, automatisation des tâches répétitives et intégration de l'IA, pensés pour les cabinets comptables du Québec. Réservez une rencontre gratuite de 30 minutes.",
  applicationName: "Jonathan Deschênes",
  authors: [{ name: "Jonathan Deschênes" }],
  keywords: [
    "site web cabinet comptable",
    "automatisation comptable",
    "site web comptable Québec",
    "intégration IA cabinet",
    "développeur web comptable",
    "Jonathan Deschênes",
    "site web tenue de livres",
    "automatisation collecte de documents",
  ],
  alternates: {
    canonical: "/",
    languages: { "fr-CA": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: siteUrl,
    siteName: "Jonathan Deschênes",
    title:
      "Modernisez votre cabinet comptable, sans la lourdeur d'une agence — Jonathan Deschênes",
    description:
      "Sites web, automatisation et IA pour cabinets comptables. Tarifs accessibles, contact direct, livraison en temps et en budget.",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Jonathan Deschênes — Sites web et automatisation pour cabinets comptables",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Modernisez votre cabinet comptable, sans la lourdeur d'une agence",
    description:
      "Sites web, automatisation et IA pour les cabinets comptables du Québec.",
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#business`,
        name: "Jonathan Deschênes",
        description:
          "Sites web, automatisation et intégration de l'IA pour cabinets comptables au Québec.",
        url: siteUrl,
        areaServed: { "@type": "AdministrativeArea", name: "Québec" },
        priceRange: "$$",
        serviceType: [
          "Conception de site web",
          "Automatisation de processus",
          "Intégration d'IA",
          "Développement d'applications sur mesure",
        ],
        inLanguage: "fr-CA",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Jonathan Deschênes",
        inLanguage: "fr-CA",
        publisher: { "@id": `${siteUrl}/#business` },
      },
    ],
  };

  return (
    <html lang="fr-CA" className={spaceGrotesk.variable}>
      <body>
        {children}
        <ModalRoot />
        <Script
          id="ld-json-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
