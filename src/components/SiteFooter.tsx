import Link from "next/link";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-x pt-[72px] pb-10">
        <div className="grid gap-10 pb-14 grid-cols-1 sm:grid-cols-2 min-[900px]:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 mb-[22px]">
              <div
                className="w-9 h-9 rounded-[9px] bg-white text-ink flex items-center justify-center font-bold text-[14px]"
                aria-hidden
              >
                JD
              </div>
              <span className="font-bold text-[14px] tracking-[.13em]">
                JONATHAN DESCHÊNES
              </span>
            </div>
            <p className="text-[14.5px] leading-[1.6] text-[#7e8694] max-w-[300px]">
              Sites web, automatisation et IA pour les cabinets comptables et
              tenue de livres — sans la lourdeur d&apos;une agence.
            </p>
          </div>
          <FooterCol title="SERVICES">
            <FooterLink href="/#services">Site web professionnel</FooterLink>
            <FooterLink href="/#services">Automatisation</FooterLink>
            <FooterLink href="/#services">Intégration de l&apos;IA</FooterLink>
            <FooterLink href="/#services">Applications sur mesure</FooterLink>
          </FooterCol>
          <FooterCol title="NAVIGATION">
            <FooterLink href="/#realisations">Réalisations</FooterLink>
            <FooterLink href="/#processus">Processus</FooterLink>
            <FooterLink href="/#a-propos">À propos</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>
          <FooterCol title="CONTACT">
            <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
            <FooterLink href="/rendez-vous">Réserver une rencontre</FooterLink>
            <FooterLink href={site.socials.linkedin} external>
              LinkedIn
            </FooterLink>
            <FooterLink href={site.socials.github} external>
              GitHub
            </FooterLink>
          </FooterCol>
        </div>
        <div className="border-t border-white/[.08] pt-[26px] flex items-center justify-between flex-wrap gap-[14px]">
          <span className="text-[13.5px] text-muted-soft">
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </span>
          <div className="flex gap-[30px] flex-wrap">
            <Link
              href="/confidentialite"
              className="text-[13.5px] text-muted-soft no-underline hover:text-white"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/confidentialite#mentions"
              className="text-[13.5px] text-muted-soft no-underline hover:text-white"
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="font-semibold text-[11px] tracking-[.16em] text-[#5d6573] mb-5">
        {title}
      </div>
      <div className="flex flex-col gap-[14px]">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls = "text-[14.5px] text-[#aab0bb] no-underline hover:text-white";
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
