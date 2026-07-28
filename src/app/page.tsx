import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import HeroVideoPlayer from "@/components/HeroVideoPlayer";
import HeroCredibility from "@/components/HeroCredibility";
import ModalLink from "@/components/ModalLink";
import Faq from "@/components/Faq";
import ProcessSteps from "@/components/ProcessSteps";
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
import { ArrowDownRight, Check } from "lucide-react";
import ProjectList from "@/components/ProjectsList";

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
						<h1 className='font-bold text-hero leading-[1.05] tracking-[-.02em] mb-5 sm:mb-7'>
							Optimisez votre{" "}
							<span className='text-brand'>cabinet comptable</span>, sans la
							lourdeur d&apos;une agence.
						</h1>
						<p className='text-body-lg leading-[1.6] text-muted lg:max-w-[520px] mb-7 sm:mb-[38px]'>
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
						className='anim-in justify-self-stretch w-full max-w-[520px] mx-auto min-[960px]:ml-auto min-[960px]:mr-0 space-y-4'
						style={{ animationDelay: "130ms" }}
					>
						<div className='border border-[#ebebe9] rounded-[16px] overflow-hidden bg-white flex flex-col shadow-[0_18px_44px_-24px_rgba(14,19,32,.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_34px_66px_-26px_rgba(14,19,32,.45)]'>
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

							<div className='p-4 flex flex-col gap-8'>
								<HeroCredibility />
								<HeroVideoPlayer />
							</div>
						</div>
					</div>
				</section>

				{/* ===== STATS + PROBLEMS (navy) ===== */}
				<section className='bg-navy text-white'>
					<div className='container-x py-12 sm:py-[70px] border-b border-white/[.07] flex items-center justify-center gap-6 sm:gap-[30px] flex-wrap'>
						<div className='font-bold text-display leading-[.9] text-brand tracking-[-.03em]'>
							20+
						</div>
						<p className='text-body-lg leading-[1.5] text-[#cfd3da] max-w-[330px]'>
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
								<h2 className='font-bold text-h2 leading-[1.15] tracking-[-.02em]'>
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
										<h3 className='font-semibold text-h3 mb-2.5 sm:mb-3'>
											{p.title}
										</h3>
										<p className='text-body-sm leading-[1.6] text-[#8b93a1]'>
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
					<div className='max-w-[1080px] mx-auto mb-10 flex justify-between'>
						<div>
							<div className='eyebrow mb-4 sm:mb-[22px]'>CAS D'ÉTUDES</div>
							<h2 className='font-bold text-h2 leading-[1.15] tracking-[-.02em] mb-4 sm:mb-[26px]'>
								Mes réalisations coups de coeur.
							</h2>
						</div>
					</div>
					<ProjectList projects={projects} />
				</section>

				{/* ===== SERVICES ===== */}
				<section id='services' className='bg-cream scroll-mt-20'>
					<div className='container-x pt-14 pb-16 sm:pt-[104px] sm:pb-[110px]'>
						<div className='max-w-[1080px] mx-auto mb-10 sm:mb-[60px]'>
							<div className='eyebrow mb-4 sm:mb-[22px]'>MES SERVICES</div>
							<h2 className='font-bold text-h2 leading-[1.15] tracking-[-.02em]'>
								Des solutions adaptés pour vous sur mesures.
							</h2>
						</div>

						<div className='max-w-[1080px] mx-auto flex-row sm:flex justify-between space-y-2 sm:space-y-0 sm:space-x-1 md:space-x-2'>
							{services.map((s, i) => {
								// Differente couleur pour le mapping
								const colors = ["bg-brand", "bg-brand-hard", "bg-brand"];

								return (
									<div
										key={s.title}
										className={`relative group sm:w-96 h-96 sm:h-[520px] md:h-[470px] p-4 lg:p-10 rounded-2xl transition-[transform,box-shadow] duration-300 ease-in-out will-change-transform hover:scale-[1.015] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] ${colors[i]}`}
									>
										<div
											className='flex-none w-10 h-10 sm:w-[46px] sm:h-[46px] text-white'
											aria-hidden
										>
											{serviceIcons[i]}
										</div>
										<div className='w-full text-white'>
											<h3 className='font-semibold text-h3 mb-2 sm:mb-2.5 leading-snug min-h-[3.6rem] sm:min-h-[3.9rem] flex items-start gap-1'>
												{s.title}
											</h3>
											<div className='text-body-sm leading-[1.6] w-full text-cream'>
												<p className='min-h-[3.3rem]'>{s.desc}</p>
												<div className='flex flex-col space-y-1 mt-4'>
													{s.options.map((options, indexY) => (
														<div
															key={indexY}
															className='flex space-x-2 items-center'
														>
															<Check size={15} />
															<p>{options}</p>
														</div>
													))}
												</div>
											</div>
										</div>
										<div className='absolute bg-white/25 text-cream w-fit rounded-full p-2 bottom-0 right-0 m-4'>
											<span
												aria-hidden
												className='inline-block lg:hidden absolute -inset-2 rounded-full border-2 border-dashed border-white/70 animate-[spin_4s_linear_infinite] motion-reduce:animate-none'
											/>
											<span
												aria-hidden
												className='hidden lg:group-hover:inline-block absolute -inset-2 rounded-full border-2 border-dashed border-white/70 lg:group-hover:animate-[spin_4s_linear_infinite] motion-reduce:animate-none'
											/>
											<ArrowDownRight size={30} className='relative' />
										</div>
									</div>
								);
							})}
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
					<div className='max-w-[1080px] mx-auto sm:flex space-x-10'>
						<div>
							<div className='eyebrow mb-4 sm:mb-[22]'>PROCESSUS</div>
							<h2 className='font-bold text-h2 leading-[1.15] tracking-[-.02em] mb-4 sm:mb-[26px]'>
								Travaillons ensemble?
							</h2>
						</div>
						<ProcessSteps steps={steps} />
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
							<h2 className='font-bold text-h2-sm leading-[1.15] tracking-[-.02em] mb-5 sm:mb-[30px]'>
								Vous parlez directement à la personne qui conçoit et livre votre
								projet.
							</h2>
							<p className='text-body-lg leading-[1.68] text-[#aab0bb] mb-5 sm:mb-[22px]'>
								Je suis Jonathan Deschênes, étudiant en Techniques de
								l&apos;informatique avec l&apos;intention de poursuivre au
								baccalauréat en génie logiciel. Avec déjà plus de 3 ans en tant
								que travailleur autonome, je me concentre dès maintenant sur
								l&apos;optimisation des cabinets comptables.
							</p>
							<p className='text-body-lg leading-[1.68] text-[#aab0bb] mb-7 sm:mb-[34px]'>
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
						<h2 className='font-bold text-h2 leading-[1.15] tracking-[-.02em]'>
							Ce que vous voudrez savoir avant d&apos;appeler
						</h2>
					</div>
					<Faq items={faqs} />
				</section>

				{/* ===== FINAL CTA (cream) ===== */}
				<section id='contact' className='bg-cream scroll-mt-20'>
					<div className='container-x py-14 sm:py-[110px] text-center'>
						<h2 className='font-bold text-h2 leading-[1.15] tracking-[-.02em] max-w-[720px] mx-auto mb-5 sm:mb-6'>
							Pas encore décidé ? Présentez-moi votre projet en 3 minutes.
						</h2>
						<p className='text-body-lg text-muted mb-7 sm:mb-[38px]'>
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
