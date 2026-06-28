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
    <header className="sticky top-0 z-50 bg-[rgba(255,255,255,.86)] backdrop-blur-[14px] border-b border-border">
      <nav
        className="container-x h-[74px] flex items-center justify-between gap-6"
        aria-label="Principale"
      >
        <Link
          href="/"
          className="flex items-center gap-[13px] no-underline text-inherit"
        >
          <span
            className="w-9 h-9 rounded-[9px] bg-ink text-white flex items-center justify-center font-bold text-[14px] tracking-[.02em]"
            aria-hidden
          >
            JD
          </span>
          <span className="font-bold text-[14px] tracking-[.13em]">
            JONATHAN DESCHÊNES
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] text-ink-soft no-underline hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <ModalLink
          modal="booking"
          className="inline-flex items-center gap-[9px] bg-brand text-white text-[14px] font-semibold px-5 py-[11px] rounded-[11px] no-underline shadow-[0_6px_18px_rgba(26,96,245,.28)] whitespace-nowrap"
        >
          Réserver une rencontre <ArrowRight />
        </ModalLink>
      </nav>
      <span className="sr-only">{site.name}</span>
    </header>
  );
}
