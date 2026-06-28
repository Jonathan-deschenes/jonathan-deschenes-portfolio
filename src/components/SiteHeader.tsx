import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowRight } from "./Icons";
import ModalLink from "./ModalLink";

const links = [
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#services", label: "Services" },
  { href: "/#processus", label: "Processus" },
  { href: "/#a-propos", label: "À propos" },
];

export default function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,.86)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid #ececed",
      }}
    >
      <nav
        className="container-x"
        style={{
          height: 74,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
        aria-label="Principale"
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 13,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              background: "#0e1320",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: ".02em",
            }}
            aria-hidden
          >
            JD
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: ".13em",
            }}
          >
            JONATHAN DESCHÊNES
          </span>
        </Link>

        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: 40 }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: 15,
                color: "#3a414d",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <ModalLink
          modal="booking"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            background: "#1a60f5",
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            padding: "11px 20px",
            borderRadius: 11,
            textDecoration: "none",
            boxShadow: "0 6px 18px rgba(26,96,245,.28)",
            whiteSpace: "nowrap",
          }}
        >
          Réserver une rencontre <ArrowRight />
        </ModalLink>
      </nav>
      <span className="sr-only">{site.name}</span>
    </header>
  );
}
