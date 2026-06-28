import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import { ArrowRight, ImagePlaceholder } from "@/components/Icons";
import { caseStudies, projects } from "@/lib/data";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.challenge.slice(0, 160),
    alternates: { canonical: `/realisations/${cs.slug}` },
    openGraph: {
      title: cs.title,
      description: cs.challenge.slice(0, 160),
      type: "article",
      url: `${site.baseUrl}/realisations/${cs.slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  const project = projects.find((p) => p.slug === slug);
  if (!cs) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.challenge.slice(0, 160),
    author: { "@type": "Person", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    url: `${site.baseUrl}/realisations/${cs.slug}`,
  };

  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-x" style={{ padding: "64px 24px 32px" }}>
          <Link
            href="/#realisations"
            style={{
              fontSize: 14,
              color: "#1a60f5",
              textDecoration: "none",
              marginBottom: 24,
              display: "inline-block",
            }}
          >
            ← Toutes les réalisations
          </Link>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            {cs.tag}
          </div>
          <h1
            style={{
              fontWeight: 700,
              fontSize: "clamp(30px, 5vw, 50px)",
              lineHeight: 1.08,
              letterSpacing: "-.02em",
              marginBottom: 14,
              maxWidth: 880,
            }}
          >
            {cs.title}
            {cs.concept && (
              <span
                style={{
                  background: "#f3a019",
                  color: "#3a2700",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: ".1em",
                  padding: "6px 12px",
                  borderRadius: 8,
                  marginLeft: 14,
                  verticalAlign: "middle",
                }}
              >
                CONCEPT
              </span>
            )}
          </h1>
        </section>

        <section className="container-x" style={{ paddingBottom: 24 }}>
          <div
            style={{
              border: "1px solid #ebebe9",
              borderRadius: 18,
              background: "#fff",
              overflow: "hidden",
              maxWidth: 1080,
            }}
          >
            <div
              style={{
                background: "#e9e9e4",
                padding: "11px 14px",
                display: "flex",
                alignItems: "center",
                gap: 13,
              }}
              aria-hidden
            >
              <div style={{ display: "flex", gap: 6 }}>
                <span
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: "#f25f57",
                  }}
                />
                <span
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: "#fbbe2e",
                  }}
                />
                <span
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: "#28c93f",
                  }}
                />
              </div>
              <div
                style={{
                  flex: 1,
                  height: 9,
                  borderRadius: 5,
                  background: "#d4d4cd",
                }}
              />
            </div>
            <div
              style={{
                background: "#e3e3de",
                border: "1.5px dashed #c4c4bd",
                margin: 14,
                borderRadius: 12,
                minHeight: 320,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#7c7c74",
              }}
              role="img"
              aria-label={`Capture du projet ${cs.title}`}
            >
              <div style={{ color: "#a3a39c", marginBottom: 14 }} aria-hidden>
                <ImagePlaceholder size={42} />
              </div>
              <div style={{ fontSize: 14 }}>
                Capture du projet à intégrer
              </div>
            </div>
          </div>
        </section>

        <section className="container-x" style={{ padding: "32px 24px 60px" }}>
          <div
            className="case-grid"
            style={{
              display: "grid",
              gap: 40,
              maxWidth: 1080,
            }}
          >
            <Card title="Le défi">{cs.challenge}</Card>
            <Card title="La solution">{cs.solution}</Card>
            <Card title="Le résultat">{cs.result}</Card>
          </div>

          <div style={{ marginTop: 40, maxWidth: 1080 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              TECHNOLOGIES UTILISÉES
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cs.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 13,
                    color: "#5d6470",
                    background: "#f0f0ed",
                    padding: "6px 12px",
                    borderRadius: 20,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "#f6f6f2" }}>
          <div
            className="container-x"
            style={{ padding: "72px 24px", textAlign: "center" }}
          >
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(26px, 4vw, 40px)",
                lineHeight: 1.15,
                letterSpacing: "-.02em",
                marginBottom: 18,
              }}
            >
              Un projet similaire ?
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#5b626e",
                marginBottom: 28,
              }}
            >
              Discutons-en pendant 30 minutes, sans engagement.
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/rendez-vous" className="btn-primary">
                Réserver une rencontre <ArrowRight />
              </Link>
              <Link href="/soumission" className="btn-outline">
                Demander une soumission
              </Link>
            </div>
          </div>
        </section>

        {project && null}
      </main>
      <SiteFooter />
      <FloatingCta />
      <style>{`
        .case-grid { grid-template-columns: 1fr; }
        @media (min-width: 768px) {
          .case-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
      <Script
        id="ld-case-study"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ececed",
        borderRadius: 16,
        padding: 28,
      }}
    >
      <h2
        style={{
          fontWeight: 600,
          fontSize: 18,
          marginBottom: 12,
          color: "#1a60f5",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: 15.5,
          lineHeight: 1.65,
          color: "#3a414d",
        }}
      >
        {children}
      </p>
    </div>
  );
}
