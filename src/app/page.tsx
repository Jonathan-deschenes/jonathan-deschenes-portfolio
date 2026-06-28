import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import CalendarCard from "@/components/CalendarCard";
import Faq from "@/components/Faq";
import {
  ArrowRight,
  IconAi,
  IconCalendar,
  IconClock,
  IconCode,
  IconDoc,
  IconLayout,
  IconUser,
  ImagePlaceholder,
} from "@/components/Icons";
import { faqs, problems, projects, services, steps } from "@/lib/data";
import { site } from "@/lib/site";

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const problemIcons = [
    <IconDoc key="doc" />,
    <IconClock key="clock" />,
    <IconLayout key="layout" />,
    <IconCalendar key="cal" />,
  ];
  const serviceIcons = [
    <IconLayout key="lo" stroke="#fff" />,
    <IconUser key="us" stroke="#fff" />,
    <IconAi key="ai" stroke="#fff" />,
    <IconCode key="co" stroke="#fff" />,
  ];

  return (
    <>
      <SiteHeader />

      <main>
        {/* ===== HERO ===== */}
        <section
          className="container-x hero-grid"
          style={{
            padding: "72px 24px 96px",
            display: "grid",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div className="anim-in">
            <div
              style={{
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: ".2em",
                color: "#9aa1ad",
                marginBottom: 26,
                textTransform: "uppercase",
              }}
            >
              NOUS / ACCOMPAGNEMENT / X / VOUS PRENEZ CONTACT
            </div>
            <h1
              style={{
                fontWeight: 700,
                fontSize: "clamp(36px, 5vw, 60px)",
                lineHeight: 1.05,
                letterSpacing: "-.02em",
                marginBottom: 28,
              }}
            >
              Modernisez votre{" "}
              <span style={{ color: "#1a60f5" }}>cabinet comptable</span>, sans
              la lourdeur d&apos;une agence.
            </h1>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: "#5b626e",
                maxWidth: 520,
                marginBottom: 38,
              }}
            >
              Sites web professionnels, automatisation des tâches répétitives et
              intégration de l&apos;IA. Votre entreprise, votre image — enfin à
              la hauteur de votre expertise.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/rendez-vous" className="btn-primary">
                Réserver une rencontre gratuite <ArrowRight />
              </Link>
              <Link href="/soumission" className="btn-outline">
                Demander une soumission
              </Link>
            </div>
          </div>
          <div className="anim-in" style={{ animationDelay: "130ms" }}>
            <CalendarCard />
          </div>
        </section>

        {/* ===== STATS + PROBLEMS (navy) ===== */}
        <section style={{ background: "#101927", color: "#fff" }}>
          <div
            className="container-x"
            style={{
              padding: "70px 24px",
              borderBottom: "1px solid rgba(255,255,255,.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "clamp(56px, 8vw, 78px)",
                lineHeight: 0.9,
                color: "#1a60f5",
                letterSpacing: "-.03em",
              }}
            >
              20+
            </div>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.5,
                color: "#cfd3da",
                maxWidth: 330,
              }}
            >
              organisations accompagnées dans leur présence web et leurs
              automatisations.
            </p>
          </div>

          <div
            className="container-x"
            style={{ padding: "96px 24px 120px" }}
            id="problemes"
          >
            <div style={{ maxWidth: 760, margin: "0 auto 56px" }}>
              <div className="eyebrow" style={{ marginBottom: 22 }}>
                CE QUE JE RÈGLE POUR VOTRE CABINET
              </div>
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(28px, 4vw, 40px)",
                  lineHeight: 1.13,
                  letterSpacing: "-.02em",
                }}
              >
                Si vous vous reconnaissez dans l&apos;un de ces irritants, on a
                des choses à se dire.
              </h2>
            </div>
            <div
              className="problem-grid"
              style={{
                maxWidth: 1080,
                margin: "0 auto",
                display: "grid",
                gap: 22,
              }}
            >
              {problems.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: "#151e2e",
                    border: "1px solid rgba(255,255,255,.06)",
                    borderRadius: 18,
                    padding: "30px 32px",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 11,
                      background: "rgba(26,96,245,.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 42,
                      color: "#1a60f5",
                    }}
                    aria-hidden
                  >
                    {problemIcons[i]}
                  </div>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: 19,
                      marginBottom: 12,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "#8b93a1",
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section
          id="realisations"
          className="container-x"
          style={{ padding: "110px 24px", scrollMarginTop: 80 }}
        >
          <div style={{ maxWidth: 1080, margin: "0 auto 60px" }}>
            <div className="eyebrow" style={{ marginBottom: 22 }}>
              RÉALISATIONS À IMPACT MESURABLE
            </div>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.15,
                letterSpacing: "-.02em",
                marginBottom: 26,
              }}
            >
              Des projets livrés.
              <br />
              Des compétences démontrées.
            </h2>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: "#5b626e",
                maxWidth: 610,
              }}
            >
              J&apos;ai accompagné des organismes et des PME dans leur présence
              web et leurs automatisations. J&apos;applique aujourd&apos;hui
              cette expérience aux besoins précis des cabinets comptables —
              chaque réalisation illustre une compétence directement
              pertinente.
            </p>
          </div>

          <div
            className="projects-grid"
            style={{
              maxWidth: 1080,
              margin: "0 auto",
              display: "grid",
              gap: 24,
            }}
          >
            {projects.map((p) => (
              <article
                key={p.slug}
                style={{
                  border: "1px solid #ebebe9",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
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
                    <Dot color="#f25f57" />
                    <Dot color="#fbbe2e" />
                    <Dot color="#28c93f" />
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
                    borderRadius: 8,
                    height: 185,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "0 18px",
                    position: "relative",
                  }}
                  role="img"
                  aria-label={p.imageAlt}
                >
                  {p.concept && (
                    <div
                      style={{
                        position: "absolute",
                        top: -2,
                        right: -2,
                        background: "#f3a019",
                        color: "#3a2700",
                        fontWeight: 700,
                        fontSize: 10,
                        letterSpacing: ".1em",
                        padding: "5px 10px",
                        borderRadius: 7,
                      }}
                    >
                      CONCEPT
                    </div>
                  )}
                  <div style={{ color: "#a3a39c", marginBottom: 14 }}>
                    <ImagePlaceholder />
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      color: "#7c7c74",
                      lineHeight: 1.5,
                    }}
                  >
                    {p.imageAlt}
                  </div>
                </div>
                <div
                  style={{
                    padding: "6px 22px 26px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      alignSelf: "flex-start",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: ".09em",
                      padding: "5px 10px",
                      borderRadius: 7,
                      marginBottom: 16,
                      background: p.tagBg,
                      color: p.tagColor,
                    }}
                  >
                    {p.tag}
                  </span>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: 21,
                      marginBottom: 13,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      color: "#5b626e",
                      marginBottom: 18,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 22,
                    }}
                  >
                    {p.chips.map((c) => (
                      <span
                        key={c}
                        style={{
                          fontSize: 12.5,
                          color: "#5d6470",
                          background: "#f0f0ed",
                          padding: "5px 11px",
                          borderRadius: 20,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/realisations/${p.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: "none",
                      color: p.linkColor,
                      marginTop: "auto",
                    }}
                  >
                    {p.cta} <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===== SERVICES (cream) ===== */}
        <section id="services" style={{ background: "#f6f6f2", scrollMarginTop: 80 }}>
          <div
            style={{
              maxWidth: 1080,
              margin: "0 auto",
              padding: "96px 24px 104px",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 48 }}>
              MES SERVICES TAILLÉS POUR VOTRE CABINET
            </div>
            <div>
              {services.map((s, i) => (
                <div
                  key={s.title}
                  style={{
                    display: "flex",
                    gap: 24,
                    padding: "32px 0",
                    borderTop: "1px solid #e1e1da",
                  }}
                >
                  <div
                    style={{
                      flex: "none",
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: "#0e1320",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                    }}
                    aria-hidden
                  >
                    {serviceIcons[i]}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontWeight: 600,
                        fontSize: 20,
                        marginBottom: 10,
                      }}
                    >
                      <span style={{ color: "#1a60f5" }}>{s.title}</span>{" "}
                      {s.tail}
                    </h3>
                    <p
                      style={{
                        fontSize: 15.5,
                        lineHeight: 1.6,
                        color: "#5b626e",
                        maxWidth: 920,
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 48,
              }}
            >
              <Link href="/rendez-vous" className="btn-primary">
                Réserver une rencontre <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== PROCESS ===== */}
        <section
          id="processus"
          className="container-x"
          style={{ padding: "104px 24px 110px", scrollMarginTop: 80 }}
        >
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <div className="eyebrow" style={{ marginBottom: 54 }}>
              COMMENT JE TRAVAILLE
            </div>
            <div
              className="steps-grid"
              style={{
                display: "grid",
                gap: 34,
              }}
            >
              {steps.map((st) => (
                <div key={st.num}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 46,
                      color: "#1a60f5",
                      letterSpacing: "-.02em",
                      marginBottom: 20,
                    }}
                  >
                    {st.num}
                  </div>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: 18,
                      marginBottom: 13,
                    }}
                  >
                    {st.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14.5,
                      lineHeight: 1.62,
                      color: "#5b626e",
                    }}
                  >
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT (navy) ===== */}
        <section
          id="a-propos"
          style={{ background: "#101927", color: "#fff", scrollMarginTop: 80 }}
        >
          <div
            className="container-x about-grid"
            style={{
              padding: "104px 24px",
              display: "grid",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "#151e2e",
                border: "1px solid rgba(255,255,255,.06)",
                borderRadius: 18,
                aspectRatio: "4/5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#6a727f",
                maxWidth: 420,
              }}
              role="img"
              aria-label="Photo professionnelle de Jonathan Deschênes"
            >
              <div style={{ marginBottom: 16 }} aria-hidden>
                <ImagePlaceholder />
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                Photo professionnelle de
                <br />
                Jonathan Deschênes
              </div>
            </div>
            <div>
              <div
                className="eyebrow"
                style={{ marginBottom: 24, color: "#1a60f5" }}
              >
                QUI RÉALISE VOTRE PROJET
              </div>
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(26px, 3.5vw, 37px)",
                  lineHeight: 1.15,
                  letterSpacing: "-.02em",
                  marginBottom: 30,
                }}
              >
                Vous parlez directement à la personne qui conçoit et livre votre
                projet — pas à un intermédiaire.
              </h2>
              <p
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.68,
                  color: "#aab0bb",
                  marginBottom: 22,
                }}
              >
                Je suis Jonathan Deschênes, étudiant en Techniques de
                l&apos;informatique avec l&apos;intention de poursuivre au
                baccalauréat en génie logiciel. J&apos;ai déjà livré des sites
                web réellement utilisés et des applications fonctionnelles en
                production.
              </p>
              <p
                style={{
                  fontSize: 16.5,
                  lineHeight: 1.68,
                  color: "#aab0bb",
                  marginBottom: 34,
                }}
              >
                Être étudiant, c&apos;est maîtriser les technologies les plus
                récentes — dont l&apos;IA — à des tarifs accessibles, avec un
                contact direct et une imputabilité totale. Votre projet ne sera
                jamais confié à quelqu&apos;un d&apos;autre.
              </p>
              <Link href="/rendez-vous" className="btn-primary">
                Réserver une rencontre <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="container-x"
          style={{ padding: "104px 24px 110px", scrollMarginTop: 80 }}
        >
          <div
            style={{
              maxWidth: 840,
              margin: "0 auto 64px",
              textAlign: "center",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              QUESTIONS FRÉQUENTES
            </div>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(28px, 4.5vw, 42px)",
                lineHeight: 1.1,
                letterSpacing: "-.02em",
              }}
            >
              Ce que vous voudrez savoir avant d&apos;appeler
            </h2>
          </div>
          <Faq items={faqs} />
        </section>

        {/* ===== FINAL CTA (cream) ===== */}
        <section id="contact" style={{ background: "#f6f6f2", scrollMarginTop: 80 }}>
          <div
            className="container-x"
            style={{ padding: "110px 24px", textAlign: "center" }}
          >
            <h2
              style={{
                fontWeight: 700,
                fontSize: "clamp(30px, 5vw, 46px)",
                lineHeight: 1.12,
                letterSpacing: "-.02em",
                maxWidth: 720,
                margin: "0 auto 24px",
              }}
            >
              Pas encore décidé ? Présentez-moi votre projet en 3 minutes.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "#5b626e",
                marginBottom: 38,
              }}
            >
              Décrivez votre besoin en deux phrases. Je vous dis si on peut
              travailler ensemble.
            </p>
            <div
              style={{
                display: "flex",
                gap: 14,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/soumission" className="btn-outline">
                Demander une soumission rapide <ArrowRight />
              </Link>
              <Link href="/rendez-vous" className="btn-primary">
                Réserver une rencontre gratuite <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingCta />

      {/* page-scoped responsive overrides */}
      <style>{`
        .hero-grid { grid-template-columns: 1fr; }
        @media (min-width: 960px) {
          .hero-grid { grid-template-columns: 1.02fr .98fr; gap: 64px; padding: 96px 40px 120px !important; }
        }
        .problem-grid { grid-template-columns: 1fr; }
        @media (min-width: 720px) {
          .problem-grid { grid-template-columns: 1fr 1fr; }
        }
        .projects-grid { grid-template-columns: 1fr; }
        @media (min-width: 720px) {
          .projects-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 960px) {
          .projects-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .steps-grid { grid-template-columns: 1fr; }
        @media (min-width: 640px) {
          .steps-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 960px) {
          .steps-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .about-grid { grid-template-columns: 1fr; }
        @media (min-width: 960px) {
          .about-grid { grid-template-columns: .82fr 1.18fr; gap: 72px; }
        }
      `}</style>

      <Script
        id="ld-json-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Script
        id="ld-json-org-extra"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            jobTitle: "Concepteur web et automatisation",
            url: site.baseUrl,
            email: site.email,
            sameAs: [site.socials.linkedin],
            knowsAbout: [
              "Site web pour cabinet comptable",
              "Automatisation des processus",
              "Intégration de l'IA",
              "Développement Next.js",
            ],
          }),
        }}
      />
    </>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <div
      style={{
        width: 11,
        height: 11,
        borderRadius: "50%",
        background: color,
      }}
    />
  );
}
