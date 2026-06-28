import Link from "next/link";
import { ArrowRight } from "./Icons";

export default function FloatingCta() {
  return (
    <Link
      href="/rendez-vous"
      className="floating-cta"
      aria-label="Réserver une rencontre gratuite"
      style={{
        position: "fixed",
        right: 28,
        bottom: 28,
        zIndex: 60,
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        background: "#1a60f5",
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
        padding: "13px 22px",
        borderRadius: 13,
        textDecoration: "none",
        boxShadow: "0 14px 34px rgba(26,96,245,.4)",
      }}
    >
      Réserver une rencontre gratuite <ArrowRight />
    </Link>
  );
}
