import Link from "next/link";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer style={{ background: "#0d1422", color: "#fff" }}>
      <div className="container-x" style={{ padding: "72px 24px 40px" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gap: 40,
            paddingBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  background: "#fff",
                  color: "#0e1320",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 14,
                }}
                aria-hidden
              >
                JD
              </div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: ".13em",
                }}
              >
                JONATHAN DESCHÊNES
              </span>
            </div>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "#7e8694",
                maxWidth: 300,
              }}
            >
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
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.08)",
            paddingTop: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <span style={{ fontSize: 13.5, color: "#6a727f" }}>
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </span>
          <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
            <Link
              href="/confidentialite"
              style={{
                fontSize: 13.5,
                color: "#6a727f",
                textDecoration: "none",
              }}
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/confidentialite#mentions"
              style={{
                fontSize: 13.5,
                color: "#6a727f",
                textDecoration: "none",
              }}
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
      <style>{`
        .footer-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1fr; }
        }
      `}</style>
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
      <div
        style={{
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: ".16em",
          color: "#5d6573",
          marginBottom: 20,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {children}
      </div>
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
  const style = {
    fontSize: 14.5,
    color: "#aab0bb",
    textDecoration: "none",
  } as const;
  if (external) {
    return (
      <a href={href} style={style} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} style={style}>
      {children}
    </Link>
  );
}
