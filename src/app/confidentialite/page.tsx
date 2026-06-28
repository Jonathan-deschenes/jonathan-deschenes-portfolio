import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité et mentions légales",
  description:
    "Politique de confidentialité, gestion des renseignements personnels (Loi 25 du Québec) et mentions légales pour le site de Jonathan Deschênes.",
  alternates: { canonical: "/confidentialite" },
};

const updated = "2026-06-28";

export default function ConfidentialitePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-x" style={{ padding: "64px 24px 80px" }}>
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              CONFIDENTIALITÉ
            </div>
            <h1
              style={{
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.15,
                letterSpacing: "-.02em",
                marginBottom: 14,
              }}
            >
              Politique de confidentialité
            </h1>
            <p style={{ color: "#6a727f", marginBottom: 32, fontSize: 14 }}>
              Dernière mise à jour : {updated}
            </p>

            <div
              style={{
                display: "grid",
                gap: 22,
                fontSize: 16,
                lineHeight: 1.7,
                color: "#3a414d",
              }}
            >
              <Section title="Qui est responsable ?">
                <p>
                  Le présent site est exploité par {site.name}, prestataire de
                  services web et d&apos;automatisation établi au Québec. Vous
                  pouvez nous joindre à{" "}
                  <a
                    href={`mailto:${site.email}`}
                    style={{ color: "#1a60f5" }}
                  >
                    {site.email}
                  </a>
                  .
                </p>
              </Section>

              <Section title="Quels renseignements sont collectés ?">
                <p>
                  Nous collectons uniquement les renseignements que vous nous
                  fournissez par les formulaires du site (réservation,
                  soumission, contact) : nom, courriel, entreprise, téléphone
                  (facultatif), description de votre besoin, échéancier et
                  budget approximatif (facultatif).
                </p>
              </Section>

              <Section title="À quelles fins ?">
                <ul style={{ paddingLeft: 22 }}>
                  <li>répondre à votre demande;</li>
                  <li>préparer la rencontre ou la soumission;</li>
                  <li>vous transmettre une confirmation par courriel;</li>
                  <li>
                    conserver une trace écrite des échanges pendant la durée
                    d&apos;un mandat éventuel.
                  </li>
                </ul>
              </Section>

              <Section title="Conservation et sécurité">
                <p>
                  Les renseignements sont conservés le temps nécessaire au
                  traitement de votre demande, et au maximum 24 mois après
                  notre dernier échange. Ils sont transmis par connexion
                  sécurisée (HTTPS) et stockés chez des fournisseurs réputés
                  (Vercel pour l&apos;hébergement, Resend pour les courriels
                  transactionnels). Aucun renseignement n&apos;est vendu ou
                  partagé à des fins commerciales.
                </p>
              </Section>

              <Section title="Vos droits (Loi 25 du Québec)">
                <p>
                  Conformément à la Loi sur la protection des renseignements
                  personnels dans le secteur privé (Loi 25), vous pouvez en
                  tout temps demander l&apos;accès, la rectification ou la
                  suppression de vos renseignements en écrivant à{" "}
                  <a
                    href={`mailto:${site.email}`}
                    style={{ color: "#1a60f5" }}
                  >
                    {site.email}
                  </a>
                  . Une réponse vous sera transmise dans les 30 jours.
                </p>
              </Section>

              <Section title="Témoins (cookies) et analytique">
                <p>
                  Ce site n&apos;utilise pas de cookies de suivi
                  publicitaires. Si une solution d&apos;analytique respectueuse
                  de la vie privée (ex. Plausible ou Umami) est activée, elle
                  fonctionne sans cookies et sans collecter de données
                  personnelles identifiables.
                </p>
              </Section>

              <Section title="Sous-traitants">
                <ul style={{ paddingLeft: 22 }}>
                  <li>
                    <strong>Vercel</strong> — hébergement du site (États-Unis /
                    Canada).
                  </li>
                  <li>
                    <strong>Resend</strong> — envoi des courriels
                    transactionnels (États-Unis).
                  </li>
                  <li>
                    <strong>Cal.com</strong> — calendrier de réservation des
                    rencontres.
                  </li>
                </ul>
              </Section>

              <Section title="Modifications">
                <p>
                  Cette politique peut être mise à jour sans préavis. La date
                  de dernière mise à jour est indiquée au début du document.
                </p>
              </Section>

              <h2
                id="mentions"
                style={{
                  fontWeight: 700,
                  fontSize: 24,
                  marginTop: 24,
                  scrollMarginTop: 100,
                }}
              >
                Mentions légales
              </h2>
              <Section title="Éditeur">
                <p>
                  {site.name} — région du {site.region}, Canada. Site
                  exploité à titre d&apos;entreprise individuelle.
                </p>
              </Section>
              <Section title="Hébergement">
                <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.</p>
              </Section>
              <Section title="Propriété intellectuelle">
                <p>
                  L&apos;ensemble du contenu du site (textes, images, code) est
                  protégé par le droit d&apos;auteur et appartient à {site.name},
                  sauf indication contraire.
                </p>
              </Section>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingCta />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        style={{
          fontWeight: 600,
          fontSize: 18,
          marginBottom: 8,
          color: "#0e1320",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
