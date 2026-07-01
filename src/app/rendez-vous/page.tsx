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
				<section className='container-x pt-10 sm:pt-16 pb-4 sm:pb-6'>
					<div className='max-w-full'>
						<div className='eyebrow mb-3 sm:mb-4'>
							RENCONTRE GRATUITE · 30 MIN
						</div>
						<h1 className='font-bold text-[clamp(24px,6vw,46px)] leading-[1.15] tracking-[-.02em] mb-3 sm:mb-[18px]'>
							Discutons de votre projet sans aucun engagement.
						</h1>
						<p className='text-[15px] sm:text-[17px] text-muted leading-[1.6] mb-5 sm:mb-7'>
							30 minutes pour cerner votre besoin, répondre à vos questions et
							voir si on peut travailler ensemble. Rencontre en personne ou en
							ligne? Vous choisissez.
						</p>
					</div>
				</section>

				<section className='container-x pb-12 sm:pb-20'>
					<div className='border border-border rounded-[16px] sm:rounded-[18px] overflow-hidden bg-white max-w-full min-h-fit'>
						<CalEmbed url={site.bookingUrl} />
					</div>
					<p className='mt-4 sm:mt-5 text-muted-soft text-[13px] sm:text-[14px]'>
						Le calendrier ne charge pas ?{" "}
						<a
							href={site.bookingUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='text-brand'
						>
							Ouvrez-le dans un nouvel onglet
						</a>
						.
					</p>
				</section>

				<section className='bg-cream'>
					<div className='container-x py-12 sm:py-[72px] text-center'>
						<h2 className='font-bold text-[clamp(22px,5vw,32px)] mb-3 sm:mb-[14px]'>
							Pas prêt à réserver ?
						</h2>
						<p className='text-muted mb-5 sm:mb-6 text-[15px] sm:text-[16px]'>
							Décrivez votre projet par écrit, je vous reviens avec une première
							idée.
						</p>
						<Link href='/soumission' className='btn-primary'>
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
