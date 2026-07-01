import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import CalEmbed from "@/components/CalEmbed";
import BookingCalendarPreview from "@/components/BookingCalendarPreview";
import ModalLink from "@/components/ModalLink";
import Faq from "@/components/Faq";
import {
	ArrowRight,
	IconAi,
	IconCalendar,
	IconClock,
	IconCode,
	IconDoc,
	IconLayout,
	IconUser,
	ImagePlaceholder,
} from "@/components/Icons";
import { faqs, problems, services, steps } from "@/lib/data";
import { getAllProjects } from "@/lib/content";
import { site } from "@/lib/site";
import Image from "next/image";

export default function Home() {
	const projects = getAllProjects();

	const faqLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((f) => ({
			"@type": "Question",
			name: f.question,
			acceptedAnswer: { "@type": "Answer", text: f.answer },
		})),
	};

	const problemIcons = [
		<IconDoc key='doc' />,
		<IconClock key='clock' />,
		<IconLayout key='layout' />,
		<IconCalendar key='cal' />,
	];
	const serviceIcons = [
		<IconLayout key='lo' stroke='#fff' />,
		<IconUser key='us' stroke='#fff' />,
		<IconAi key='ai' stroke='#fff' />,
		<IconCode key='co' stroke='#fff' />,
	];

	return (
		<>
			<SiteHeader />

			<main>
				{/* ===== HERO ===== */}
				<section className='container-x grid items-center gap-10 pt-10 pb-14 sm:pt-[72px] sm:pb-24 min-[960px]:gap-16 min-[960px]:pt-24 min-[960px]:pb-[120px] min-[960px]:grid-cols-[1.02fr_.98fr]'>
					<div className='anim-in'>
						<div className='font-medium text-[11px] sm:text-[12px] tracking-[.18em] sm:tracking-[.2em] text-faint mb-5 sm:mb-[26px] uppercase'>
							WEB · AUTOMATISATION · IA · CABINETS COMPTABLES
						</div>
						<h1 className='font-bold text-[clamp(32px,7vw,60px)] leading-[1.05] tracking-[-.02em] mb-5 sm:mb-7'>
							Optimisez votre{" "}
							<span className='text-brand'>cabinet comptable</span>, sans la
							lourdeur d&apos;une agence.
						</h1>
						<p className='text-[16px] sm:text-[18px] leading-[1.6] text-muted max-w-[520px] mb-7 sm:mb-[38px]'>
							Sites web professionnels, automatisation des tâches répétitives et
							intégration de l&apos;IA. Votre entreprise, votre image à la
							hauteur de votre expertise.
						</p>
						<div className='flex gap-3 sm:gap-[14px] flex-wrap'>
							<ModalLink modal='booking' className='btn-primary'>
								Réserver une rencontre gratuite <ArrowRight />
							</ModalLink>
							<ModalLink modal='quote' className='btn-outline'>
								Demander une soumission
							</ModalLink>
						</div>
					</div>
					<div
						className='anim-in justify-self-stretch w-full max-w-[460px] mx-auto min-[960px]:ml-auto min-[960px]:mr-0'
						style={{ animationDelay: "130ms" }}
					>
						{/* Desktop : carte blanche + calendrier réel embarqué */}
						<div className='hidden min-[960px]:block bg-gray-800 border border-border rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-[0_40px_80px_-28px_rgba(14,19,32,.25)]'>
							<div className='px-4 sm:px-5 pt-3 sm:pt-4 pb-2.5 sm:pb-3 border-b border-neutral-700 flex items-center justify-between gap-2 flex-wrap'>
								<div className='min-w-0'>
									<div className='font-semibold text-[11px] sm:text-[12px] tracking-[.14em] text-white'>
										RENCONTRE GRATUITE · 30 MIN
									</div>
									<div className='text-[12px] sm:text-[13px] text-neutral-300 mt-0.5'>
										Choisissez une plage qui vous convient.
									</div>
								</div>
								<ModalLink
									modal='booking'
									ariaLabel='Ouvrir le calendrier en grand'
									className='text-[12px] text-white font-semibold no-underline whitespace-nowrap hover:underline flex-none'
								>
									Plein écran →
								</ModalLink>
							</div>
							<div className='h-[560px] overflow-y-auto overflow-x-hidden'>
								<CalEmbed
									url={site.bookingUrl}
									namespace='hero'
									hideEventTypeDetails
								/>
							</div>
						</div>
						{/* Mobile : calendrier dynamique simulé (ouvre le modal) */}
						<BookingCalendarPreview className='min-[960px]:hidden' />
					</div>
				</section>

				{/* ===== STATS + PROBLEMS (navy) ===== */}
				<section className='bg-navy text-white'>
					<div className='container-x py-12 sm:py-[70px] border-b border-white/[.07] flex items-center justify-center gap-6 sm:gap-[30px] flex-wrap'>
						<div className='font-bold text-[clamp(48px,12vw,78px)] leading-[.9] text-brand tracking-[-.03em]'>
							20+
						</div>
						<p className='text-[16px] sm:text-[18px] leading-[1.5] text-[#cfd3da] max-w-[330px]'>
							organisations accompagnées dans leur présence web et leurs
							automatisations.
						</p>
					</div>

					<div
						id='problemes'
						className='container-x pt-14 pb-16 sm:pt-24 sm:pb-[120px]'
					>
						<div className='max-w-[1080px] mx-auto'>
							<div className='max-w-[760px] mb-10 sm:mb-14'>
								<div className='eyebrow mb-4 sm:mb-[22px]'>
									CE QUI VOUS RALENTIT
								</div>
								<h2 className='font-bold text-[clamp(24px,5.5vw,40px)] leading-[1.15] tracking-[-.02em]'>
									Les cabinets comptables me contactent dès l&apos;apparition
									d&apos;un de ces premiers signes de ralentissement.
								</h2>
							</div>
							<div className='mx-auto grid gap-4 sm:gap-[22px] grid-cols-1 min-[720px]:grid-cols-2'>
								{problems.map((p, i) => (
									<div
										key={i}
										className='bg-navy-card border border-white/[.06] rounded-[16px] sm:rounded-[18px] px-6 py-6 sm:px-8 sm:py-[30px]'
									>
										<div
											className='w-11 h-11 rounded-[11px] bg-[rgba(26,96,245,.14)] flex items-center justify-center mb-7 sm:mb-[42px] text-brand'
											aria-hidden
										>
											{problemIcons[i]}
										</div>
										<h3 className='font-semibold text-[17px] sm:text-[19px] mb-2.5 sm:mb-3'>
											{p.title}
										</h3>
										<p className='text-[14px] sm:text-[15px] leading-[1.6] text-[#8b93a1]'>
											{p.desc}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* ===== PROJECTS ===== */}
				<section
					id='realisations'
					className='container-x py-16 sm:py-[110px] scroll-mt-20'
				>
					<div className='max-w-[1080px] mx-auto mb-10 sm:mb-[60px]'>
						<div className='eyebrow mb-4 sm:mb-[22px]'>
							RÉALISATIONS & IMPACT MESURABLE
						</div>
						<h2 className='font-bold text-[clamp(24px,5.5vw,40px)] leading-[1.15] tracking-[-.02em] mb-4 sm:mb-[26px]'>
							Des projets livrés.
							<br />
							Des compétences démontrées.
						</h2>
						<p className='text-[15px] sm:text-[17px] leading-[1.6] text-muted max-w-[610px]'>
							Découvrez comment combiner conception web, développement
							d&apos;applications et automatisation intelligente pour résoudre
							des problèmes concrets, améliorer les processus et créer des
							systèmes plus efficaces pour les entreprises.
						</p>
					</div>

					<div className='max-w-[1080px] mx-auto grid gap-4 sm:gap-6 grid-cols-1 min-[720px]:grid-cols-2 min-[960px]:grid-cols-3'>
						{projects.map((p) => (
							<article
								key={p.slug}
								className='border border-[#ebebe9] rounded-[16px] overflow-hidden bg-white flex flex-col'
							>
								<div
									className='bg-[#e9e9e4] px-[14px] py-[11px] flex items-center gap-[13px]'
									aria-hidden
								>
									<div className='flex gap-1.5'>
										<Dot color='#f25f57' />
										<Dot color='#fbbe2e' />
										<Dot color='#28c93f' />
									</div>
									<div className='flex-1 h-[9px] rounded-[5px] bg-[#d4d4cd]' />
								</div>
								<div
									className={`m-[14px] rounded-lg h-[185px] flex flex-col items-center justify-center text-center relative overflow-hidden ${
										p.logo
											? "bg-white border border-[#ebebe9]"
											: "bg-[#e3e3de] border-[1.5px] border-dashed border-[#c4c4bd] px-[18px]"
									}`}
									role='img'
									aria-label={`Visuel du projet ${p.title}`}
								>
									{p.logo ? (
										<Image
											src={p.logo}
											alt={`Logo ${p.title}`}
											width={240}
											height={140}
											className='max-h-[130px] w-auto object-contain'
										/>
									) : (
										<ImagePlaceholder />
									)}
								</div>
								<div className='px-[22px] pt-1.5 pb-[26px] flex flex-col flex-1'>
									<span
										className='inline-block self-start font-bold text-[11px] tracking-[.09em] px-2.5 py-[5px] rounded-[7px] mb-4'
										style={{ background: p.tagBg, color: p.tagColor }}
									>
										{p.tag}
									</span>
									<h3 className='font-semibold text-[21px] mb-[13px]'>
										{p.title}
									</h3>
									<p className='text-[14.5px] leading-[1.6] text-muted mb-[18px]'>
										{p.description}
									</p>
									<div className='flex flex-wrap gap-2 mb-[22px]'>
										{p.chips.map((c) => (
											<span
												key={c}
												className='text-[12.5px] text-[#5d6470] bg-[#f0f0ed] px-[11px] py-[5px] rounded-[20px]'
											>
												{c}
											</span>
										))}
									</div>
									<Link
										href={`/realisations/${p.slug}`}
										className='inline-flex items-center gap-[7px] font-semibold text-[14px] no-underline mt-auto'
										style={{ color: p.linkColor }}
									>
										{p.cta} <ArrowRight />
									</Link>
								</div>
							</article>
						))}
					</div>
				</section>

				{/* ===== SERVICES (cream) ===== */}
				<section id='services' className='bg-cream scroll-mt-20'>
					<div className='max-w-[1080px] mx-auto pt-14 pb-16 sm:pt-24 sm:pb-[104px] px-6 md:px-10'>
						<div className='eyebrow mb-8 sm:mb-12'>
							MES SERVICES POUR OPTIMISER VOTRE CABINET
						</div>
						<div>
							{services.map((s, i) => (
								<div
									key={s.title}
									className='flex gap-4 sm:gap-6 py-6 sm:py-8 border-t border-cream-border'
								>
									<div
										className='flex-none w-10 h-10 sm:w-[46px] sm:h-[46px] rounded-xl bg-ink flex items-center justify-center text-white'
										aria-hidden
									>
										{serviceIcons[i]}
									</div>
									<div className='min-w-0'>
										<h3 className='font-semibold text-[17px] sm:text-[20px] mb-2 sm:mb-2.5 leading-snug'>
											<span className='text-brand'>{s.title}</span> {s.tail}
										</h3>
										<p className='text-[14px] sm:text-[15.5px] leading-[1.6] text-muted max-w-[920px]'>
											{s.desc}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className='flex justify-center mt-10 sm:mt-12'>
							<ModalLink modal='booking' className='btn-primary'>
								Réserver une rencontre <ArrowRight />
							</ModalLink>
						</div>
					</div>
				</section>

				{/* ===== PROCESS ===== */}
				<section
					id='processus'
					className='container-x pt-14 pb-16 sm:pt-[104px] sm:pb-[110px] scroll-mt-20'
				>
					<div className='max-w-[1080px] mx-auto'>
						<div className='eyebrow mb-8 sm:mb-[54px]'>
							COMMENT JE TRAVAILLE
						</div>
						<div className='grid gap-8 sm:gap-[34px] grid-cols-1 sm:grid-cols-2 min-[960px]:grid-cols-4'>
							{steps.map((st) => (
								<div key={st.num}>
									<div className='font-bold text-[38px] sm:text-[46px] text-brand tracking-[-.02em] mb-4 sm:mb-5'>
										{st.num}
									</div>
									<h3 className='font-semibold text-[17px] sm:text-[18px] mb-3 sm:mb-[13px]'>
										{st.title}
									</h3>
									<p className='text-[14px] sm:text-[14.5px] leading-[1.62] text-muted'>
										{st.desc}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ===== ABOUT (navy) ===== */}
				<section id='a-propos' className='bg-navy text-white scroll-mt-20'>
					<div className='container-x py-14 sm:py-[104px] grid items-center gap-10 sm:gap-14 min-[960px]:gap-[72px] min-[960px]:grid-cols-[.82fr_1.18fr]'>
						<div
							className='relative overflow-hidden bg-navy-card border border-white/[.06] rounded-[16px] sm:rounded-[18px] aspect-[4/5] flex flex-col items-center justify-center text-center text-muted-soft max-w-[300px] sm:max-w-[420px] w-full mx-auto min-[960px]:mx-0'
							role='img'
							aria-label='Photo professionnelle de Jonathan Deschênes'
						>
							<div className='pointer-events-none absolute inset-0 grid grid-cols-12 gap-4 opacity-35'>
								{Array.from({ length: 192 }).map((_, index) => (
									<IconCode key={index} />
								))}
							</div>
							<Image
								src='/about-me.png'
								alt={`Capture à propos de moi Jonathan Deschênes`}
								width={1600}
								height={900}
								sizes='(max-width: 1100px) 100vw, 1080px'
								className='block w-full h-auto opacity-75'
								priority
							/>
						</div>
						<div>
							<div className='eyebrow mb-4 sm:mb-6'>
								QUI RÉALISE VOTRE PROJET
							</div>
							<h2 className='font-bold text-[clamp(22px,5vw,37px)] leading-[1.15] tracking-[-.02em] mb-5 sm:mb-[30px]'>
								Vous parlez directement à la personne qui conçoit et livre votre
								projet.
							</h2>
							<p className='text-[15px] sm:text-[16.5px] leading-[1.68] text-[#aab0bb] mb-5 sm:mb-[22px]'>
								Je suis Jonathan Deschênes, étudiant en Techniques de
								l&apos;informatique avec l&apos;intention de poursuivre au
								baccalauréat en génie logiciel. Avec déjà plus de 3 ans en tant
								que travailleur autonome, je me concentre dès maintenant sur
								l&apos;optimisation des cabinets comptables.
							</p>
							<p className='text-[15px] sm:text-[16.5px] leading-[1.68] text-[#aab0bb] mb-7 sm:mb-[34px]'>
								Être étudiant, c&apos;est maîtriser les technologies les plus
								récentes à des tarifs accessibles, avec un contact direct et une
								imputabilité totale. Votre projet ne sera jamais confié à
								quelqu&apos;un d&apos;autre.
							</p>
							<ModalLink modal='booking' className='btn-primary'>
								Réserver une rencontre <ArrowRight />
							</ModalLink>
						</div>
					</div>
				</section>

				{/* ===== FAQ ===== */}
				<section
					id='faq'
					className='container-x pt-14 pb-16 sm:pt-[104px] sm:pb-[110px] scroll-mt-20'
				>
					<div className='max-w-[840px] mx-auto mb-10 sm:mb-16 text-center'>
						<div className='eyebrow mb-4 sm:mb-5'>QUESTIONS FRÉQUENTES</div>
						<h2 className='font-bold text-[clamp(24px,6vw,42px)] leading-[1.15] tracking-[-.02em]'>
							Ce que vous voudrez savoir avant d&apos;appeler
						</h2>
					</div>
					<Faq items={faqs} />
				</section>

				{/* ===== FINAL CTA (cream) ===== */}
				<section id='contact' className='bg-cream scroll-mt-20'>
					<div className='container-x py-14 sm:py-[110px] text-center'>
						<h2 className='font-bold text-[clamp(24px,6vw,46px)] leading-[1.15] tracking-[-.02em] max-w-[720px] mx-auto mb-5 sm:mb-6'>
							Pas encore décidé ? Présentez-moi votre projet en 3 minutes.
						</h2>
						<p className='text-[15px] sm:text-[17px] text-muted mb-7 sm:mb-[38px]'>
							Répondez à ce cours formulaire de soumission et je vous dis si on
							peut travailler ensemble.
						</p>
						<div className='flex gap-3 sm:gap-[14px] justify-center flex-wrap'>
							<ModalLink modal='quote' className='btn-outline'>
								Demander une soumission rapide <ArrowRight />
							</ModalLink>
							<ModalLink modal='booking' className='btn-primary'>
								Réserver une rencontre gratuite <ArrowRight />
							</ModalLink>
						</div>
					</div>
				</section>
			</main>

			<SiteFooter />
			<FloatingCta />

			<Script
				id='ld-json-faq'
				type='application/ld+json'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
			/>
			<Script
				id='ld-json-org-extra'
				type='application/ld+json'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Person",
						name: site.name,
						jobTitle: "Concepteur web et automatisation",
						url: site.baseUrl,
						email: site.email,
						sameAs: [site.socials.linkedin],
						knowsAbout: [
							"Site web pour cabinet comptable",
							"Automatisation des processus",
							"Intégration de l'IA",
							"Développement Next.js",
						],
					}),
				}}
			/>
		</>
	);
}

function Dot({ color }: { color: string }) {
	return (
		<div
			className='w-[11px] h-[11px] rounded-full'
			style={{ background: color }}
		/>
	);
}
