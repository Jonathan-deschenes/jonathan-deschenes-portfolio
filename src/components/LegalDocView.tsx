import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FloatingCta from "@/components/FloatingCta";
import type { LegalDoc } from "@/lib/legal";

export default function LegalDocView({ doc }: { doc: LegalDoc }) {
	return (
		<>
			<SiteHeader />
			<main>
				<section className='container-x pt-10 sm:pt-16 pb-14 sm:pb-20'>
					<div>
						<div className='eyebrow mb-3 sm:mb-4'>{doc.eyebrow}</div>
						<h1 className='font-bold text-[clamp(24px,5.5vw,40px)] leading-[1.15] tracking-[-.02em] mb-3 sm:mb-[14px]'>
							{doc.title}
						</h1>
						<p className='text-muted-soft mb-6 sm:mb-8 text-[13px] sm:text-[14px]'>
							Dernière mise à jour : {doc.updated}
						</p>

						<div
							className='grid gap-[22px] text-[16px] leading-[1.7] text-ink-soft [&_h2]:font-semibold [&_h2]:text-[18px] [&_h2]:text-ink [&_h2]:mb-2 [&_h2]:scroll-mt-[100px] [&_h3]:font-semibold [&_h3]:text-[16px] [&_h3]:text-ink [&_h3]:mb-2 [&_h3]:mt-2 [&_ul]:pl-[22px] [&_ul]:list-disc [&_a]:text-brand'
							dangerouslySetInnerHTML={{ __html: doc.html }}
						/>
					</div>
				</section>
			</main>
			<SiteFooter />
			<FloatingCta />
		</>
	);
}
