import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import { ArrowRight, ImagePlaceholder } from "@/components/Icons";
import ModalLink from "@/components/ModalLink";
import { getProject, getProjectSlugs } from "@/lib/content";
import { site } from "@/lib/site";
import Image from "next/image";

export function generateStaticParams() {
	return getProjectSlugs().map((slug) => ({ slug }));
}

// Seuls les slugs générés au build existent : tout autre slug → 404, sans
// jamais atteindre le système de fichiers avec une valeur venue de l'URL.
export const dynamicParams = false;

type Params = { slug: string };

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const { slug } = await params;
	const cs = getProject(slug);
	if (!cs) return {};
	return {
		title: cs.title,
		description: cs.defi.slice(0, 160),
		alternates: { canonical: `/realisations/${cs.slug}` },
		openGraph: {
			title: cs.title,
			description: cs.defi.slice(0, 160),
			type: "article",
			url: `${site.baseUrl}/realisations/${cs.slug}`,
		},
	};
}

export default async function CaseStudyPage({
	params,
}: {
	params: Promise<Params>;
}) {
	const { slug } = await params;
	const cs = getProject(slug);
	if (!cs) notFound();

	const heroImage = cs.images[0] ?? "";

	const ld = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: cs.title,
		description: cs.defi.slice(0, 160),
		author: { "@type": "Person", name: site.name },
		publisher: { "@type": "Organization", name: site.name },
		url: `${site.baseUrl}/realisations/${cs.slug}`,
	};

	return (
		<>
			<SiteHeader />
			<main>
				<section className='container-x pt-10 sm:pt-16 pb-6 sm:pb-8'>
					<Link
						href='/#realisations'
						className='text-[14px] text-brand no-underline mb-4 sm:mb-6 inline-block'
					>
						← Toutes les réalisations
					</Link>
					<div className='eyebrow mb-3 sm:mb-[14px]'>{cs.tag}</div>
					<h1 className='font-bold text-[clamp(24px,6vw,50px)] leading-[1.12] sm:leading-[1.08] tracking-[-.02em] mb-3 sm:mb-[14px] max-w-[880px]'>
						<span>{cs.title}</span>
					</h1>
					<p className='text-[15.5px] leading-[1.65] text-ink-soft text-justify'>
						{cs.description}
					</p>
				</section>

				<section className='container-x pb-6'>
					<div className='border border-[#ebebe9] rounded-[18px] bg-white overflow-hidden max-w-full'>
						<div
							className='bg-[#e9e9e4] px-[14px] py-[11px] flex items-center gap-[13px]'
							aria-hidden
						>
							<div className='flex gap-1.5'>
								<span className='w-[11px] h-[11px] rounded-full bg-[#f25f57]' />
								<span className='w-[11px] h-[11px] rounded-full bg-[#fbbe2e]' />
								<span className='w-[11px] h-[11px] rounded-full bg-[#28c93f]' />
							</div>
							<div className='flex-1 h-[9px] rounded-[5px] bg-[#d4d4cd]' />
						</div>
						{heroImage ? (
							<Image
								src={heroImage}
								alt={`Capture du projet ${cs.title}`}
								width={1600}
								height={900}
								sizes='(max-width: 1100px) 100vw, 1080px'
								className='block w-full h-auto'
								priority
							/>
						) : (
							<div
								className='bg-[#e3e3de] border-[1.5px] border-dashed border-[#c4c4bd] m-2 sm:m-[14px] rounded-[10px] sm:rounded-[12px] min-h-[200px] sm:min-h-[320px] flex flex-col items-center justify-center text-center text-[#7c7c74] p-4'
								role='img'
								aria-label={`Capture du projet ${cs.title}`}
							>
								<div className='text-[#a3a39c] mb-[14px]' aria-hidden>
									<ImagePlaceholder size={42} />
								</div>
								<div className='text-[14px]'>Capture du projet à intégrer</div>
							</div>
						)}
					</div>
				</section>

				<section className='container-x pt-8 pb-12 sm:pb-[60px]'>
					<div className='grid gap-5 sm:gap-10 max-w-full grid-cols-1 md:grid-cols-3'>
						<Card title='Le défi'>{cs.defi}</Card>
						<Card title='La solution'>{cs.solution}</Card>
						<Card title='Le résultat'>{cs.resultat}</Card>
					</div>

					<div className='mt-8 sm:mt-10 max-w-full'>
						<div className='eyebrow mb-3 sm:mb-[14px]'>
							TECHNOLOGIES UTILISÉES
						</div>
						<div className='flex flex-wrap gap-2'>
							{cs.tech.map((t) => (
								<span
									key={t}
									className='text-[13px] text-[#5d6470] bg-[#f0f0ed] px-3 py-1.5 rounded-[20px]'
								>
									{t}
								</span>
							))}
						</div>
					</div>
					{cs.link && (
						<a
							href={cs.link.startsWith("http") ? cs.link : `https://${cs.link}`}
							target='_blank'
							rel='noopener noreferrer'
							className='btn-primary inline-flex items-center gap-2 mt-5 sm:mt-6'
						>
							Voir le site <ArrowRight />
						</a>
					)}
				</section>

				<section className='bg-cream'>
					<div className='container-x py-12 sm:py-[72px] text-center'>
						<h2 className='font-bold text-[clamp(26px,4vw,40px)] leading-[1.15] tracking-[-.02em] mb-[18px]'>
							Un projet similaire ?
						</h2>
						<p className='text-[16px] text-muted mb-7'>
							Discutons-en pendant 30 minutes, sans engagement.
						</p>
						<div className='flex gap-[14px] justify-center flex-wrap'>
							<ModalLink modal='booking' className='btn-primary'>
								Réserver une rencontre <ArrowRight />
							</ModalLink>
							<ModalLink modal='quote' className='btn-outline'>
								Demander une soumission
							</ModalLink>
						</div>
					</div>
				</section>
			</main>
			<SiteFooter />
			<FloatingCta />
			<Script
				id='ld-case-study'
				type='application/ld+json'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
			/>
		</>
	);
}

function Card({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className='bg-white border border-border rounded-[16px] p-7'>
			<h2 className='font-semibold text-[18px] mb-3 text-brand'>{title}</h2>
			<p className='text-[15.5px] leading-[1.65] text-ink-soft text-justify'>
				{children}
			</p>
		</div>
	);
}
