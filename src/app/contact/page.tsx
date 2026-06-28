import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Jonathan Deschênes — questions, partenariats ou demandes diverses.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-x" style={{ padding: "64px 24px 24px" }}>
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              CONTACT
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
              Une question ? Écrivez-moi.
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "#5b626e",
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              Pour toute question, partenariat ou demande qui ne rentre pas
              dans les autres formulaires. Pour un projet, préférez{" "}
              <Link href="/rendez-vous" style={{ color: "#1a60f5" }}>
                la rencontre gratuite
              </Link>{" "}
              ou{" "}
              <Link href="/soumission" style={{ color: "#1a60f5" }}>
                la soumission
              </Link>
              .
            </p>
          </div>
        </section>

        <section
          className="container-x"
          style={{
            paddingBottom: 80,
            display: "grid",
            gap: 48,
            gridTemplateColumns: "1fr",
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <ContactForm />
          </div>
          <div
            style={{
              background: "#f6f6f2",
              borderRadius: 18,
              padding: 28,
              maxWidth: 600,
            }}
          >
            <h2 style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>
              Coordonnées directes
            </h2>
            <p style={{ color: "#5b626e", lineHeight: 1.6, fontSize: 15 }}>
              Courriel :{" "}
              <a
                href={`mailto:${site.email}`}
                style={{ color: "#1a60f5", textDecoration: "underline" }}
              >
                {site.email}
              </a>
            </p>
            <p
              style={{
                color: "#5b626e",
                lineHeight: 1.6,
                fontSize: 15,
                marginTop: 6,
              }}
            >
              Région desservie : {site.region} — rencontres virtuelles
              disponibles.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingCta />
    </>
  );
}
