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
        <section className="container-x pt-10 sm:pt-16 pb-4 sm:pb-6">
          <div className="max-w-[720px]">
            <div className="eyebrow mb-3 sm:mb-4">CONTACT</div>
            <h1 className="font-bold text-[clamp(24px,6vw,46px)] leading-[1.15] tracking-[-.02em] mb-3 sm:mb-[18px]">
              Une question ? Écrivez-moi.
            </h1>
            <p className="text-[15px] sm:text-[17px] text-muted leading-[1.6] mb-5 sm:mb-7">
              Pour toute question, partenariat ou demande qui ne rentre pas
              dans les autres formulaires. Pour un projet, préférez{" "}
              <Link href="/rendez-vous" className="text-brand">
                la rencontre gratuite
              </Link>{" "}
              ou{" "}
              <Link href="/soumission" className="text-brand">
                la soumission
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="container-x pb-14 sm:pb-20 grid gap-8 sm:gap-12">
          <div className="max-w-[600px]">
            <ContactForm />
          </div>
          <div className="bg-cream rounded-[16px] sm:rounded-[18px] p-5 sm:p-7 max-w-[600px]">
            <h2 className="font-semibold text-[18px] mb-2.5">
              Coordonnées directes
            </h2>
            <p className="text-muted leading-[1.6] text-[15px]">
              Courriel :{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-brand underline"
              >
                {site.email}
              </a>
            </p>
            <p className="text-muted leading-[1.6] text-[15px] mt-1.5">
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
