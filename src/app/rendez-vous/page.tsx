import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import { ArrowRight } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Réserver une rencontre gratuite de 30 minutes",
  description:
    "Réservez une rencontre virtuelle gratuite de 30 minutes pour discuter de votre projet — site web, automatisation ou intégration de l'IA pour votre cabinet comptable.",
  alternates: { canonical: "/rendez-vous" },
};

export default function RendezVousPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-x" style={{ padding: "64px 24px 24px" }}>
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              RENCONTRE GRATUITE · 30 MIN
            </div>
            <h1
              style={{
                fontWeight: 700,
                fontSize: "clamp(30px, 4.5vw, 46px)",
                lineHeight: 1.1,
                letterSpacing: "-.02em",
                marginBottom: 18,
              }}
            >
              Discutons de votre projet — sans engagement.
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "#5b626e",
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              30 minutes pour cerner votre besoin, répondre à vos questions et
              voir si on peut travailler ensemble. Virtuel, partout au Québec.
            </p>
          </div>
        </section>

        <section className="container-x" style={{ paddingBottom: 80 }}>
          <div
            style={{
              border: "1px solid #ececed",
              borderRadius: 18,
              overflow: "hidden",
              background: "#fff",
              maxWidth: 980,
            }}
          >
            <iframe
              title="Calendrier de réservation"
              src={site.bookingUrl}
              loading="lazy"
              style={{
                width: "100%",
                height: 760,
                border: 0,
                display: "block",
              }}
            />
          </div>
          <p style={{ marginTop: 20, color: "#6a727f", fontSize: 14 }}>
            Le calendrier ne charge pas ?{" "}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a60f5" }}
            >
              Ouvrez-le dans un nouvel onglet
            </a>
            .
          </p>
        </section>

        <section style={{ background: "#f6f6f2" }}>
          <div
            className="container-x"
            style={{ padding: "72px 24px", textAlign: "center" }}
          >
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 32px)",
                marginBottom: 14,
              }}
            >
              Pas prêt à réserver ?
            </h2>
            <p
              style={{
                color: "#5b626e",
                marginBottom: 24,
                fontSize: 16,
              }}
            >
              Décrivez votre projet par écrit, je vous reviens avec une
              première idée.
            </p>
            <Link href="/soumission" className="btn-primary">
              Demander une soumission <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingCta />
    </>
  );
}
