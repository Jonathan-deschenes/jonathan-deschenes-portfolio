"use client";

import { useState } from "react";
import Modal from "@/components/Modal";

// Pochette vidéo du hero : un aperçu muet en boucle (trop petit pour lire les
// détails) surmonté d'un bouton lecture. Un clic ouvre la vidéo en grand, avec
// le son, dans un modal — là où la voix off et les détails sont lisibles.
export default function HeroVideoPlayer({
	className = "",
}: {
	className?: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				type='button'
				onClick={() => setOpen(true)}
				aria-label='Lire la présentation vidéo en plein écran'
				className={`group relative block w-full aspect-video bg-navy border border-border rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-[0_40px_80px_-28px_rgba(14,19,32,.25)] cursor-pointer ${className}`}
			>
				{/* Aperçu animé, muet, en boucle (pochette) */}
				<video
					className='absolute inset-0 w-full h-full object-cover'
					src='/hero-video.mp4'
					autoPlay
					muted
					loop
					playsInline
					preload='metadata'
					aria-hidden
				/>

				{/* Voile + bouton lecture */}
				<span className='absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[rgba(14,19,32,0.72)] group-hover:bg-[rgba(14,19,32,.42)] transition-colors'>
					<span className='w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-full bg-brand text-white flex items-center justify-center shadow-[0_10px_30px_rgba(26,96,245,.5)] group-hover:scale-105 transition-transform'>
						<PlayIcon />
					</span>
					<span className='font-semibold text-[13px] sm:text-[14px] tracking-[.06em] text-white uppercase'>
						Voir la présentation · 1 min
					</span>
				</span>
			</button>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				title='Présentation en 1 minute'
				size='xl'
			>
				{/* eslint-disable-next-line jsx-a11y/media-has-caption */}
				<video
					className='block w-full max-h-[78vh] object-contain rounded-[12px] bg-black'
					src='/hero-video.mp4'
					controls
					autoPlay
					playsInline
					aria-label="Présentation vidéo des services de Jonathan Deschênes : sites web, automatisation et intégration de l'IA pour les cabinets comptables."
				/>
			</Modal>
		</>
	);
}

function PlayIcon() {
	return (
		<svg
			width='28'
			height='28'
			viewBox='0 0 24 24'
			fill='currentColor'
			aria-hidden
			className='ml-1'
		>
			<path d='M8 5v14l11-7z' />
		</svg>
	);
}
