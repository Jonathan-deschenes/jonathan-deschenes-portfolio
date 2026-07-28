import Image from "next/image";
import { Quote } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import { ImagePlaceholder } from "../Icons";
import PreviewableImage from "./PreviewableImage";

function About({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className='pt-10 sm:pt-16 sm:pb-8'>
			<div className='lg:flex justify-between'>
				<div className='eyebrow mb-4 sm:mb-[22px]'>À PROPOS</div>
				<div className='max-w-3xl'>
					<h2 className='font-bold text-h2-sm leading-[1.15] tracking-[-.02em] mb-5 sm:mb-[30px]'>
						{title}
					</h2>
					<div className='text-body-lg text-muted mb-7 sm:mb-[38px]'>
						{children}
					</div>
				</div>
			</div>
		</section>
	);
}

function Feature({
	title,
	image,
	imageSide = "right",
	mobile = false,
	children,
}: {
	title: string;
	image?: string;
	imageSide?: "left" | "right";
	mobile?: boolean;
	children: React.ReactNode;
}) {
	return (
		<div className='grid gap-6 sm:gap-8 items-center grid-cols-1 md:grid-cols-2 bg-white my-32 sm:my-40'>
			<div className={imageSide === "left" ? "md:order-2" : ""}>
				<h3 className='font-bold text-h3 leading-[1.15] tracking-[-.02em] max-w-[720px] mx-auto mb-2.5 sm:mb-3'>
					{title}
				</h3>
				<div className='text-body-lg text-muted mb-6 sm:mb-[30px]'>
					{children}
				</div>
			</div>
			{image && mobile ? (
				<div
					className={`flex justify-center ${
						imageSide === "left" ? "md:order-1" : ""
					}`}
				>
					<div className='relative w-[240px] sm:w-[280px] rounded-[40px] bg-[#161616] border-[10px] border-[#161616] shadow-card'>
						<div className='absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#161616] rounded-b-[14px] z-10' />
						<div className='rounded-[28px] overflow-hidden bg-white aspect-[9/19.5]'>
							<PreviewableImage
								src={image}
								alt={title}
								width={375}
								height={812}
								sizes='(max-width: 640px) 240px, 280px'
								className='block w-full h-full object-contain'
							/>
						</div>
					</div>
				</div>
			) : image ? (
				<div
					className={`rounded-[14px] ${
						imageSide === "left" ? "md:order-1" : ""
					}`}
				>
					<div className='rounded-[8px] overflow-hidden bg-white  border border-border-soft'>
						<PreviewableImage
							src={image}
							alt={title}
							width={800}
							height={600}
							sizes='(max-width: 768px) 100vw, 400px'
							className='block w-full h-auto'
						/>
					</div>
				</div>
			) : (
				<div
					className='bg-[#e3e3de] border-[1.5px] border-dashed border-[#c4c4bd] rounded-[14px] min-h-[200px] sm:min-h-[320px] flex flex-col items-center justify-center text-center text-[#7c7c74] p-4'
					role='img'
					aria-label={`Capture du projet ${title}`}
				>
					<div className='text-[#a3a39c] mb-[14px]' aria-hidden>
						<ImagePlaceholder size={42} />
					</div>
					<div className='text-body-sm'>Capture du projet à intégrer</div>
				</div>
			)}
		</div>
	);
}

function Gallery({ images, caption }: { images: string[]; caption?: string }) {
	return (
		<figure className='my-10 sm:my-14'>
			<div className='overflow-hidden grid gap-2 sm:gap-[14px] grid-cols-1 sm:grid-cols-2'>
				{images.map((src) => {
					if (src) {
						return (
							<div
								key={src}
								className='rounded-[10px] overflow-hidden border border-border-soft aspect-video'
							>
								<PreviewableImage
									src={src}
									alt={caption ?? ""}
									width={800}
									height={600}
									sizes='(max-width: 640px) 100vw, 50vw'
									className='block w-full h-full object-cover'
								/>
							</div>
						);
					} else {
						return (
							<div
								className='bg-[#e3e3de] border-[1.5px] border-dashed border-[#c4c4bd] m-2 sm:m-[14px] rounded-[10px] sm:rounded-[12px] min-h-[200px] sm:min-h-[320px] flex flex-col items-center justify-center text-center text-[#7c7c74] p-4'
								role='img'
								aria-label={`Capture du projet`}
							>
								<div className='text-[#a3a39c] mb-[14px]' aria-hidden>
									<ImagePlaceholder size={42} />
								</div>
								<div className='text-body-sm'>Capture du projet à intégrer</div>
							</div>
						);
					}
				})}
			</div>
			{caption && (
				<figcaption className='text-caption text-muted mt-2 text-center'>
					{caption}
				</figcaption>
			)}
		</figure>
	);
}

function Testimonial({
	author,
	role,
	avatar,
	children,
}: {
	author: string;
	role?: string;
	avatar?: string;
	children: React.ReactNode;
}) {
	return (
		<div className='bg-cream border border-cream-border rounded-[16px] p-6 sm:p-7 my-10 sm:my-14'>
			<Quote className='text-brand mb-3 sm:mb-4' size={26} aria-hidden />
			<div className='text-body-lg leading-[1.65] text-ink-soft italic mb-4 sm:mb-5'>
				{children}
			</div>
			<div className='flex items-center gap-3 sm:gap-4'>
				{avatar && (
					<Image
						src={avatar}
						alt={author}
						width={40}
						height={40}
						className='rounded-full object-cover w-10 h-10'
					/>
				)}
				<div>
					<div className='font-semibold text-body-sm text-brand'>{author}</div>
					{role && <div className='text-caption text-muted'>{role}</div>}
				</div>
			</div>
		</div>
	);
}

export const caseStudyComponents: MDXComponents = {
	About,
	Feature,
	Gallery,
	Testimonial,
};
