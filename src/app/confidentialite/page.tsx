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
        <section className="container-x pt-16 pb-20">
          <div className="max-w-[760px]">
            <div className="eyebrow mb-4">CONFIDENTIALITÉ</div>
            <h1 className="font-bold text-[clamp(28px,4vw,40px)] leading-[1.15] tracking-[-.02em] mb-[14px]">
              Politique de confidentialité
            </h1>
            <p className="text-muted-soft mb-8 text-[14px]">
              Dernière mise à jour : {updated}
            </p>

            <div className="grid gap-[22px] text-[16px] leading-[1.7] text-ink-soft">
              <Section title="Qui est responsable ?">
                <p>
                  Le présent site est exploité par {site.name}, prestataire de
                  services web et d&apos;automatisation établi au Québec. Vous
                  pouvez nous joindre à{" "}
                  <a href={`mailto:${site.email}`} className="text-brand">
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
                <ul className="pl-[22px] list-disc">
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
                  <a href={`mailto:${site.email}`} className="text-brand">
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
                <ul className="pl-[22px] list-disc">
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
                className="font-bold text-[24px] mt-6 scroll-mt-[100px]"
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
      <h2 className="font-semibold text-[18px] mb-2 text-ink">{title}</h2>
      {children}
    </div>
  );
}
