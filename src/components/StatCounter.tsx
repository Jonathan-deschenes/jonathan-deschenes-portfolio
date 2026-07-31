"use client";

import { useEffect, useRef, useState } from "react";

const DESKTOP_QUERY = "(min-width: 960px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const DURATION_MS = 3000;

export default function StatCounter({
	value,
	suffix = "",
	className = "",
}: {
	value: number;
	suffix?: string;
	className?: string;
}) {
	const [count, setCount] = useState(() =>
		typeof window !== "undefined" &&
		window.matchMedia(REDUCED_MOTION_QUERY).matches
			? value
			: 0,
	);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

		let frame: number;
		let started = false;

		const animate = () => {
			if (started) return;
			started = true;
			const start = performance.now();
			const tick = (now: number) => {
				const progress = Math.min((now - start) / DURATION_MS, 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				setCount(Math.round(eased * value));
				if (progress < 1) frame = requestAnimationFrame(tick);
			};
			frame = requestAnimationFrame(tick);
		};

		// Desktop: la section est visible dès le chargement, donc on lance au montage.
		// Mobile: on attend que la section entre dans le viewport au scroll.
		if (window.matchMedia(DESKTOP_QUERY).matches) {
			animate();
			return () => cancelAnimationFrame(frame);
		}

		const node = ref.current;
		if (!node) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) animate();
			},
			{ threshold: 0.4 },
		);
		observer.observe(node);

		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	}, [value]);

	return (
		<div ref={ref} className={className}>
			{count}
			{suffix}
		</div>
	);
}
