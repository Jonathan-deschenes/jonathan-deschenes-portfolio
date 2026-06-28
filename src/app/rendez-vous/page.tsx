import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import { ArrowRight } from "@/components/Icons";
import CalEmbed from "@/components/CalEmbed";
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
        <section className="container-x pt-16 pb-6">
          <div className="max-w-[760px]">
            <div className="eyebrow mb-4">RENCONTRE GRATUITE · 30 MIN</div>
            <h1 className="font-bold text-[clamp(30px,4.5vw,46px)] leading-[1.1] tracking-[-.02em] mb-[18px]">
              Discutons de votre projet — sans engagement.
            </h1>
            <p className="text-[17px] text-muted leading-[1.6] mb-7">
              30 minutes pour cerner votre besoin, répondre à vos questions et
              voir si on peut travailler ensemble. Virtuel, partout au Québec.
            </p>
          </div>
        </section>

        <section className="container-x pb-20">
          <div className="border border-border rounded-[18px] overflow-hidden bg-white max-w-[980px] min-h-[760px]">
            <CalEmbed url={site.bookingUrl} />
          </div>
          <p className="mt-5 text-muted-soft text-[14px]">
            Le calendrier ne charge pas ?{" "}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand"
            >
              Ouvrez-le dans un nouvel onglet
            </a>
            .
          </p>
        </section>

        <section className="bg-cream">
          <div className="container-x py-[72px] text-center">
            <h2 className="font-bold text-[clamp(24px,3vw,32px)] mb-[14px]">
              Pas prêt à réserver ?
            </h2>
            <p className="text-muted mb-6 text-[16px]">
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
