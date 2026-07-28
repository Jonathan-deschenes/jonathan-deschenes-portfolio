"use client";
import { ProjectContent } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import { ImagePlaceholder } from "./Icons";
import { useEffect, useRef, useState } from "react";

// Nombre projet par défaut
const PREVIEW_COUNT = 3;
const ACCORDION_ROOT_MARGIN = "-45% 0px -45% 0px";

export default function ProjectList({
	projects,
}: {
	projects: ProjectContent[];
}) {
	const [showAll, setShowAll] = useState(false);

	const visibleProject = showAll ? projects : projects.slice(0, PREVIEW_COUNT);
	const hasMore = projects.length > PREVIEW_COUNT;

	// Accordéon mobile: un seul projet actif à la fois selon la position au scroll,
	// ou selon un clic manuel (qui bloque le scroll tant que l'utilisateur ne re-scroll pas)
	const [activeSlug, setActiveSlug] = useState<string | null>(null);
	const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
	const intersecting = useRef<Map<string, boolean>>(new Map());
	const manualOverride = useRef(false);

	useEffect(() => {
		intersecting.current = new Map();

		const applyScrollActive = () => {
			const active = visibleProject.find((project) =>
				intersecting.current.get(project.slug),
			);
			setActiveSlug(active ? active.slug : null);
		};

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const slug = entry.target.getAttribute("data-slug");
					if (slug) intersecting.current.set(slug, entry.isIntersecting);
				});
				if (!manualOverride.current) applyScrollActive();
			},
			{ rootMargin: ACCORDION_ROOT_MARGIN, threshold: 0 },
		);

		itemRefs.current.forEach((el) => observer.observe(el));

		// Un clic ouvre manuellement un projet; le prochain scroll redonne
		// le contrôle à l'observateur de position.
		const handleScroll = () => {
			if (manualOverride.current) {
				manualOverride.current = false;
				applyScrollActive();
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", handleScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showAll, projects]);

	const handleManualToggle = (slug: string) => {
		manualOverride.current = true;
		setActiveSlug((prev) => (prev === slug ? null : slug));
	};

	return (
		<div className='relative max-w-[1080px] mx-auto'>
			{/* Desktop: grille inchangée */}
			<div className='hidden lg:grid relative space-x-2 lg:grid-cols-2 xl:grid-cols-3'>
				{visibleProject.map((project) => (
					<article
						key={project.slug}
						className='bg-white flex flex-col min-w-72 group transition-all duration-700 hover:scale-105 p-2 rounded-2xl'
					>
						<Link
							href={`/realisations/${project.slug}`}
							className='flex flex-col space-y-2'
						>
							<div
								className={` rounded-lg h-[185px] flex flex-col items-center justify-center text-center relative overflow-hidden ${
									project.logo
										? "bg-project-background border border-[#ebebe9]"
										: "bg-[#e3e3de] border-[1.5px] border-dashed border-[#c4c4bd] px-[18px]"
								}`}
								role='img'
								aria-label={`Visuel du projet ${project.title}`}
							>
								{project.logo ? (
									<Image
										src={project.logo}
										alt={`Logo ${project.title}`}
										width={240}
										height={140}
										className='max-h-[130px] transition-all duration-500 group-hover:scale-110 w-auto object-contain'
									/>
								) : (
									<ImagePlaceholder />
								)}
							</div>
							<div className='pt-1.5 pb-[26px] flex flex-col flex-1'>
								<h3 className='font-semibold text-h3 mb-[13px] text-brand'>
									{project.title}
								</h3>
								<p className='text-body-sm leading-[1.6] text-muted mb-[18px]'>
									{project.description}
								</p>
							</div>
						</Link>
					</article>
				))}
			</div>

			{/* Mobile: accordéon, un item actif à la fois selon le scroll ou le clic */}
			<ul className='lg:hidden relative flex flex-col gap-3'>
				{visibleProject.map((project) => {
					const isActive = project.slug === activeSlug;
					return (
						<li
							key={project.slug}
							ref={(el) => {
								if (el) itemRefs.current.set(project.slug, el);
								else itemRefs.current.delete(project.slug);
							}}
							data-slug={project.slug}
							className='bg-white flex flex-col p-2 rounded-2xl'
						>
							<div className='flex flex-col space-y-2'>
								<button
									type='button'
									onClick={() => handleManualToggle(project.slug)}
									aria-expanded={isActive}
									aria-controls={`project-panel-${project.slug}`}
									className='flex flex-col space-y-2 w-full text-left'
								>
									<div
										className={` rounded-lg h-[185px] flex flex-col items-center justify-center text-center relative overflow-hidden ${
											project.logo
												? "bg-project-background border border-[#ebebe9]"
												: "bg-[#e3e3de] border-[1.5px] border-dashed border-[#c4c4bd] px-[18px]"
										}`}
										role='img'
										aria-label={`Visuel du projet ${project.title}`}
									>
										{project.logo ? (
											<Image
												src={project.logo}
												alt={`Logo ${project.title}`}
												width={240}
												height={140}
												className='max-h-[130px] w-auto object-contain'
											/>
										) : (
											<ImagePlaceholder />
										)}
									</div>
									<div
										id={`project-panel-${project.slug}`}
										className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
											isActive
												? "grid-rows-[1fr] opacity-100"
												: "grid-rows-[0fr] opacity-0"
										}`}
									>
										<div className='overflow-hidden'>
											<div aria-hidden={!isActive} className='pt-1.5 pb-[18px]'>
												<h3 className='font-semibold text-h3 mb-[13px] text-brand'>
													{project.title}
												</h3>
												<p className='text-body-sm leading-[1.6] text-muted'>
													{project.description}
												</p>
											</div>
										</div>
									</div>
								</button>
								<Link
									href={`/realisations/${project.slug}`}
									className='btn-primary text-sm py-2.5 px-5 justify-center'
								>
									Voir le projet
								</Link>
							</div>
						</li>
					);
				})}
			</ul>

			{hasMore && (
				<div className='flex justify-center mt-6'>
					<button
						type='button'
						onClick={() => setShowAll((prev) => !prev)}
						className='btn-outline'
					>
						{showAll ? "Voir moins" : "Voir plus"}
					</button>
				</div>
			)}
		</div>
	);
}
