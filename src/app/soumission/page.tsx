import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import SubmissionForm from "@/components/SubmissionForm";
import { ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Demander une soumission gratuite",
  description:
    "Décrivez votre projet en quelques lignes. Recevez une première idée et une orientation claire — sans engagement.",
  alternates: { canonical: "/soumission" },
};

export default function SoumissionPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-x" style={{ padding: "64px 24px 24px" }}>
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              SOUMISSION GRATUITE
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
              Présentez-moi votre projet — je vous reviens rapidement.
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "#5b626e",
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              Pas prêt à réserver une rencontre ? Décrivez votre besoin en
              quelques lignes. Je vous envoie une première idée, une orientation
              ou une estimation par courriel.
            </p>
          </div>
        </section>

        <section
          className="container-x"
          style={{ paddingBottom: 80, display: "grid", gap: 40 }}
        >
          <div
            style={{
              display: "grid",
              gap: 48,
              gridTemplateColumns: "1fr",
              alignItems: "start",
            }}
          >
            <div style={{ maxWidth: 600 }}>
              <SubmissionForm />
            </div>
          </div>
          <div
            style={{
              background: "#101927",
              color: "#fff",
              borderRadius: 18,
              padding: "32px",
              maxWidth: 600,
            }}
          >
            <h2 style={{ fontSize: 20, marginBottom: 12, fontWeight: 600 }}>
              Vous préférez parler directement ?
            </h2>
            <p
              style={{
                color: "#aab0bb",
                marginBottom: 20,
                lineHeight: 1.6,
                fontSize: 15,
              }}
            >
              Réservez une rencontre de 30 minutes — gratuite et virtuelle.
            </p>
            <Link
              href="/rendez-vous"
              className="btn-primary"
              style={{ background: "#1a60f5" }}
            >
              Réserver une rencontre <ArrowRight />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingCta />
    </>
  );
}
