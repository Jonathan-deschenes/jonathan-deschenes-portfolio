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
        <section className="container-x pt-16 pb-6">
          <div className="max-w-[760px]">
            <div className="eyebrow mb-4">SOUMISSION GRATUITE</div>
            <h1 className="font-bold text-[clamp(30px,4.5vw,46px)] leading-[1.1] tracking-[-.02em] mb-[18px]">
              Présentez-moi votre projet — je vous reviens rapidement.
            </h1>
            <p className="text-[17px] text-muted leading-[1.6] mb-7">
              Pas prêt à réserver une rencontre ? Décrivez votre besoin en
              quelques lignes. Je vous envoie une première idée, une orientation
              ou une estimation par courriel.
            </p>
          </div>
        </section>

        <section className="container-x pb-20 grid gap-10">
          <div className="max-w-[600px]">
            <SubmissionForm />
          </div>
          <div className="bg-navy text-white rounded-[18px] p-8 max-w-[600px]">
            <h2 className="text-[20px] mb-3 font-semibold">
              Vous préférez parler directement ?
            </h2>
            <p className="text-[#aab0bb] mb-5 leading-[1.6] text-[15px]">
              Réservez une rencontre de 30 minutes — gratuite et virtuelle.
            </p>
            <Link href="/rendez-vous" className="btn-primary">
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
