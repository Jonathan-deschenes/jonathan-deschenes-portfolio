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
				<section className='container-x pt-10 sm:pt-16 pb-4 sm:pb-6'>
					<div className='max-w-[760px]'>
						<div className='eyebrow mb-3 sm:mb-4'>SOUMISSION GRATUITE</div>
						<h1 className='font-bold text-h1 leading-[1.15] tracking-[-.02em] mb-3 sm:mb-[18px]'>
							Présentez-moi votre projet et je vous reviens rapidement.
						</h1>
						<p className='text-body-lg text-muted leading-[1.6] mb-5 sm:mb-7'>
							Pas prêt à réserver une rencontre ? Décrivez votre besoin en
							quelques lignes. Je vous envoie une première idée, une orientation
							ou une estimation par courriel.
						</p>
					</div>
				</section>

				<section className='container-x pb-14 sm:pb-20 grid gap-6 sm:gap-10'>
					<SubmissionForm />
					<div className='bg-navy text-white rounded-[16px] sm:rounded-[18px] p-6 sm:p-8'>
						<h2 className='text-h3 mb-2.5 sm:mb-3 font-semibold'>
							Vous préférez parler directement ?
						</h2>
						<p className='text-[#aab0bb] mb-4 sm:mb-5 leading-[1.6] text-body-sm'>
							Réservez une rencontre de 30 minutes 100% gratuite et virtuelle.
						</p>
						<Link href='/rendez-vous' className='btn-primary'>
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
