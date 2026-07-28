"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

function readPreviewIdFromUrl(): string | null {
	if (typeof window === "undefined") return null;
	const params = new URLSearchParams(window.location.search);
	if (params.get("modal") !== "preview") return null;
	return params.get("id");
}

export default function ImagePreviewModal() {
	const [src, setSrc] = useState<string | null>(() => readPreviewIdFromUrl());

	useEffect(() => {
		const onPop = () => setSrc(readPreviewIdFromUrl());
		window.addEventListener("popstate", onPop);
		return () => window.removeEventListener("popstate", onPop);
	}, []);

	const close = useCallback(() => {
		if (typeof window === "undefined") return;
		const url = new URL(window.location.href);
		url.searchParams.delete("modal");
		url.searchParams.delete("id");
		window.history.replaceState(null, "", url);
		setSrc(null);
	}, []);

	useEffect(() => {
		if (!src) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [src, close]);

	if (!src || typeof document === "undefined") return null;

	return createPortal(
		<div
			role='dialog'
			aria-modal='true'
			aria-label="Aperçu de l'image"
			onClick={close}
			className='fixed inset-0 z-[100] bg-[rgba(14,19,32,.85)] flex items-center justify-center p-2 sm:p-8 animate-[modal-fade_180ms_ease]'
		>
			<button
				type='button'
				onClick={close}
				aria-label='Fermer'
				className='absolute top-4 right-4 z-10 border-0 bg-transparent cursor-pointer p-2 rounded-lg text-white hover:bg-white/10'
			>
				<svg
					width='26'
					height='26'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					aria-hidden
				>
					<path d='M18 6 6 18M6 6l12 12' />
				</svg>
			</button>
			<div
				onClick={(e) => e.stopPropagation()}
				className='relative w-full h-full max-w-6xl max-h-[90vh]'
			>
				<Image
					src={src}
					alt="Aperçu de l'image"
					fill
					sizes='100vw'
					className='object-contain'
				/>
			</div>
		</div>,
		document.body
	);
}
