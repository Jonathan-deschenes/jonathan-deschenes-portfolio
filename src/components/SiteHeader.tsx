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
		<header className='sticky top-0 z-50 bg-[rgba(255,255,255,.86)] backdrop-blur-[14px] border-b border-border'>
			<nav
				className='container-x h-[64px] sm:h-[74px] flex items-center justify-between gap-3 sm:gap-6'
				aria-label='Principale'
			>
				<Link
					href='/'
					className='flex items-center gap-2.5 sm:gap-[13px] no-underline text-inherit min-w-0'
				>
					<span
						className='w-9 h-9 rounded-[9px] bg-ink text-white flex items-center justify-center font-bold text-body-sm tracking-[.02em] flex-none'
						aria-hidden
					>
						JD
					</span>
					<span className='hidden sm:inline font-bold text-body-sm tracking-[.13em]'>
						JONATHAN DESCHÊNES
					</span>
				</Link>

				<div className='hidden lg:flex items-center gap-10'>
					{links.map((l) => (
						<Link
							key={l.href}
							href={l.href}
							className='text-body-sm text-ink-soft no-underline hover:text-ink'
						>
							{l.label}
						</Link>
					))}
				</div>

				<ModalLink
					modal='booking'
					ariaLabel='Réserver une rencontre'
					className='inline-flex items-center gap-2 bg-brand text-white text-control font-semibold px-3.5 sm:px-5 py-2.5 sm:py-[11px] rounded-[11px] no-underline shadow-[0_6px_18px_rgba(26,96,245,.28)] whitespace-nowrap'
				>
					<span className='hidden sm:inline'>Réserver une rencontre</span>
					<span className='sm:hidden'>Réserver</span>
					<ArrowRight />
				</ModalLink>
			</nav>
			<span className='sr-only'>{site.name}</span>
		</header>
	);
}
