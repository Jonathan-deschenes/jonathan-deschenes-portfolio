import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import CalEmbed from "@/components/CalEmbed";
import ModalLink from "@/components/ModalLink";
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
        <section className="container-x grid items-center gap-12 pt-[72px] pb-24 min-[960px]:gap-16 min-[960px]:pt-24 min-[960px]:pb-[120px] min-[960px]:grid-cols-[1.02fr_.98fr]">
          <div className="anim-in">
            <div className="font-medium text-[12px] tracking-[.2em] text-faint mb-[26px] uppercase">
              NOUS / ACCOMPAGNEMENT / X / VOUS PRENEZ CONTACT
            </div>
            <h1 className="font-bold text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-.02em] mb-7">
              Modernisez votre{" "}
              <span className="text-brand">cabinet comptable</span>, sans la
              lourdeur d&apos;une agence.
            </h1>
            <p className="text-[18px] leading-[1.6] text-muted max-w-[520px] mb-[38px]">
              Sites web professionnels, automatisation des tâches répétitives et
              intégration de l&apos;IA. Votre entreprise, votre image — enfin à
              la hauteur de votre expertise.
            </p>
            <div className="flex gap-[14px] flex-wrap">
              <ModalLink modal="booking" className="btn-primary">
                Réserver une rencontre gratuite <ArrowRight />
              </ModalLink>
              <ModalLink modal="quote" className="btn-outline">
                Demander une soumission
              </ModalLink>
            </div>
          </div>
          <div
            className="anim-in justify-self-stretch w-full max-w-[460px] ml-auto"
            style={{ animationDelay: "130ms" }}
          >
            <div className="bg-white border border-border rounded-[22px] p-1.5 shadow-[0_40px_80px_-28px_rgba(14,19,32,.25)] overflow-hidden">
              <div className="px-4 pt-[14px] pb-2 border-b border-[#f1f1ef]">
                <div className="font-semibold text-[12px] tracking-[.14em] text-brand">
                  RENCONTRE GRATUITE · 30 MIN
                </div>
                <div className="text-[13px] text-muted mt-1">
                  Choisissez une plage qui vous convient.
                </div>
              </div>
              <div className="min-h-[520px]">
                <CalEmbed url={site.bookingUrl} />
              </div>
            </div>
          </div>
        </section>

        {/* ===== STATS + PROBLEMS (navy) ===== */}
        <section className="bg-navy text-white">
          <div className="container-x py-[70px] border-b border-white/[.07] flex items-center justify-center gap-[30px] flex-wrap">
            <div className="font-bold text-[clamp(56px,8vw,78px)] leading-[.9] text-brand tracking-[-.03em]">
              20+
            </div>
            <p className="text-[18px] leading-[1.5] text-[#cfd3da] max-w-[330px]">
              organisations accompagnées dans leur présence web et leurs
              automatisations.
            </p>
          </div>

          <div id="problemes" className="container-x pt-24 pb-[120px]">
            <div className="max-w-[760px] mx-auto mb-14">
              <div className="eyebrow mb-[22px]">
                CE QUE JE RÈGLE POUR VOTRE CABINET
              </div>
              <h2 className="font-bold text-[clamp(28px,4vw,40px)] leading-[1.13] tracking-[-.02em]">
                Si vous vous reconnaissez dans l&apos;un de ces irritants, on a
                des choses à se dire.
              </h2>
            </div>
            <div className="max-w-[1080px] mx-auto grid gap-[22px] grid-cols-1 min-[720px]:grid-cols-2">
              {problems.map((p, i) => (
                <div
                  key={i}
                  className="bg-navy-card border border-white/[.06] rounded-[18px] px-8 py-[30px]"
                >
                  <div
                    className="w-11 h-11 rounded-[11px] bg-[rgba(26,96,245,.14)] flex items-center justify-center mb-[42px] text-brand"
                    aria-hidden
                  >
                    {problemIcons[i]}
                  </div>
                  <h3 className="font-semibold text-[19px] mb-3">{p.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-[#8b93a1]">
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
          className="container-x py-[110px] scroll-mt-20"
        >
          <div className="max-w-[1080px] mx-auto mb-[60px]">
            <div className="eyebrow mb-[22px]">
              RÉALISATIONS À IMPACT MESURABLE
            </div>
            <h2 className="font-bold text-[clamp(28px,4vw,40px)] leading-[1.15] tracking-[-.02em] mb-[26px]">
              Des projets livrés.
              <br />
              Des compétences démontrées.
            </h2>
            <p className="text-[17px] leading-[1.6] text-muted max-w-[610px]">
              J&apos;ai accompagné des organismes et des PME dans leur présence
              web et leurs automatisations. J&apos;applique aujourd&apos;hui
              cette expérience aux besoins précis des cabinets comptables —
              chaque réalisation illustre une compétence directement
              pertinente.
            </p>
          </div>

          <div className="max-w-[1080px] mx-auto grid gap-6 grid-cols-1 min-[720px]:grid-cols-2 min-[960px]:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.slug}
                className="border border-[#ebebe9] rounded-[16px] overflow-hidden bg-white flex flex-col"
              >
                <div
                  className="bg-[#e9e9e4] px-[14px] py-[11px] flex items-center gap-[13px]"
                  aria-hidden
                >
                  <div className="flex gap-1.5">
                    <Dot color="#f25f57" />
                    <Dot color="#fbbe2e" />
                    <Dot color="#28c93f" />
                  </div>
                  <div className="flex-1 h-[9px] rounded-[5px] bg-[#d4d4cd]" />
                </div>
                <div
                  className="bg-[#e3e3de] border-[1.5px] border-dashed border-[#c4c4bd] m-[14px] rounded-lg h-[185px] flex flex-col items-center justify-center text-center px-[18px] relative"
                  role="img"
                  aria-label={p.imageAlt}
                >
                  {p.concept && (
                    <div className="absolute -top-0.5 -right-0.5 bg-[#f3a019] text-[#3a2700] font-bold text-[10px] tracking-[.1em] px-2.5 py-[5px] rounded-[7px]">
                      CONCEPT
                    </div>
                  )}
                  <div className="text-[#a3a39c] mb-[14px]">
                    <ImagePlaceholder />
                  </div>
                  <div className="text-[13.5px] text-[#7c7c74] leading-[1.5]">
                    {p.imageAlt}
                  </div>
                </div>
                <div className="px-[22px] pt-1.5 pb-[26px] flex flex-col flex-1">
                  <span
                    className="inline-block self-start font-bold text-[11px] tracking-[.09em] px-2.5 py-[5px] rounded-[7px] mb-4"
                    style={{ background: p.tagBg, color: p.tagColor }}
                  >
                    {p.tag}
                  </span>
                  <h3 className="font-semibold text-[21px] mb-[13px]">
                    {p.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.6] text-muted mb-[18px]">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-[22px]">
                    {p.chips.map((c) => (
                      <span
                        key={c}
                        className="text-[12.5px] text-[#5d6470] bg-[#f0f0ed] px-[11px] py-[5px] rounded-[20px]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/realisations/${p.slug}`}
                    className="inline-flex items-center gap-[7px] font-semibold text-[14px] no-underline mt-auto"
                    style={{ color: p.linkColor }}
                  >
                    {p.cta} <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===== SERVICES (cream) ===== */}
        <section id="services" className="bg-cream scroll-mt-20">
          <div className="max-w-[1080px] mx-auto pt-24 pb-[104px] px-6">
            <div className="eyebrow mb-12">
              MES SERVICES TAILLÉS POUR VOTRE CABINET
            </div>
            <div>
              {services.map((s, i) => (
                <div
                  key={s.title}
                  className="flex gap-6 py-8 border-t border-cream-border"
                >
                  <div
                    className="flex-none w-[46px] h-[46px] rounded-xl bg-ink flex items-center justify-center text-white"
                    aria-hidden
                  >
                    {serviceIcons[i]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[20px] mb-2.5">
                      <span className="text-brand">{s.title}</span> {s.tail}
                    </h3>
                    <p className="text-[15.5px] leading-[1.6] text-muted max-w-[920px]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <ModalLink modal="booking" className="btn-primary">
                Réserver une rencontre <ArrowRight />
              </ModalLink>
            </div>
          </div>
        </section>

        {/* ===== PROCESS ===== */}
        <section
          id="processus"
          className="container-x pt-[104px] pb-[110px] scroll-mt-20"
        >
          <div className="max-w-[1080px] mx-auto">
            <div className="eyebrow mb-[54px]">COMMENT JE TRAVAILLE</div>
            <div className="grid gap-[34px] grid-cols-1 sm:grid-cols-2 min-[960px]:grid-cols-4">
              {steps.map((st) => (
                <div key={st.num}>
                  <div className="font-bold text-[46px] text-brand tracking-[-.02em] mb-5">
                    {st.num}
                  </div>
                  <h3 className="font-semibold text-[18px] mb-[13px]">
                    {st.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.62] text-muted">
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
          className="bg-navy text-white scroll-mt-20"
        >
          <div className="container-x py-[104px] grid items-center gap-14 min-[960px]:gap-[72px] min-[960px]:grid-cols-[.82fr_1.18fr]">
            <div
              className="bg-navy-card border border-white/[.06] rounded-[18px] aspect-[4/5] flex flex-col items-center justify-center text-center text-muted-soft max-w-[420px]"
              role="img"
              aria-label="Photo professionnelle de Jonathan Deschênes"
            >
              <div className="mb-4" aria-hidden>
                <ImagePlaceholder />
              </div>
              <div className="text-[14px] leading-[1.5]">
                Photo professionnelle de
                <br />
                Jonathan Deschênes
              </div>
            </div>
            <div>
              <div className="eyebrow mb-6">QUI RÉALISE VOTRE PROJET</div>
              <h2 className="font-bold text-[clamp(26px,3.5vw,37px)] leading-[1.15] tracking-[-.02em] mb-[30px]">
                Vous parlez directement à la personne qui conçoit et livre votre
                projet — pas à un intermédiaire.
              </h2>
              <p className="text-[16.5px] leading-[1.68] text-[#aab0bb] mb-[22px]">
                Je suis Jonathan Deschênes, étudiant en Techniques de
                l&apos;informatique avec l&apos;intention de poursuivre au
                baccalauréat en génie logiciel. J&apos;ai déjà livré des sites
                web réellement utilisés et des applications fonctionnelles en
                production.
              </p>
              <p className="text-[16.5px] leading-[1.68] text-[#aab0bb] mb-[34px]">
                Être étudiant, c&apos;est maîtriser les technologies les plus
                récentes — dont l&apos;IA — à des tarifs accessibles, avec un
                contact direct et une imputabilité totale. Votre projet ne sera
                jamais confié à quelqu&apos;un d&apos;autre.
              </p>
              <ModalLink modal="booking" className="btn-primary">
                Réserver une rencontre <ArrowRight />
              </ModalLink>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="container-x pt-[104px] pb-[110px] scroll-mt-20"
        >
          <div className="max-w-[840px] mx-auto mb-16 text-center">
            <div className="eyebrow mb-5">QUESTIONS FRÉQUENTES</div>
            <h2 className="font-bold text-[clamp(28px,4.5vw,42px)] leading-[1.1] tracking-[-.02em]">
              Ce que vous voudrez savoir avant d&apos;appeler
            </h2>
          </div>
          <Faq items={faqs} />
        </section>

        {/* ===== FINAL CTA (cream) ===== */}
        <section id="contact" className="bg-cream scroll-mt-20">
          <div className="container-x py-[110px] text-center">
            <h2 className="font-bold text-[clamp(30px,5vw,46px)] leading-[1.12] tracking-[-.02em] max-w-[720px] mx-auto mb-6">
              Pas encore décidé ? Présentez-moi votre projet en 3 minutes.
            </h2>
            <p className="text-[17px] text-muted mb-[38px]">
              Décrivez votre besoin en deux phrases. Je vous dis si on peut
              travailler ensemble.
            </p>
            <div className="flex gap-[14px] justify-center flex-wrap">
              <ModalLink modal="quote" className="btn-outline">
                Demander une soumission rapide <ArrowRight />
              </ModalLink>
              <ModalLink modal="booking" className="btn-primary">
                Réserver une rencontre gratuite <ArrowRight />
              </ModalLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingCta />

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
      className="w-[11px] h-[11px] rounded-full"
      style={{ background: color }}
    />
  );
}
