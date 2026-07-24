"use client";

import { useEffect, useState } from "react";
import type { Step } from "@/lib/data";

const ACTIVE_MS = 2200;
const GAP_MS = 1000;
const CYCLE_MS = ACTIVE_MS + GAP_MS;

export default function ProcessSteps({ steps }: { steps: Step[] }) {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setActiveIndex((current) => (current + 1) % steps.length);
		}, CYCLE_MS);
		return () => clearInterval(id);
	}, [steps.length]);

	return (
		<div className='grid gap-4 grid-cols-1 sm:grid-cols-2 min-[960px]:grid-cols-4'>
			{steps.map((step, i) => (
				<div
					key={step.num}
					className='group relative overflow-hidden bg-neutral-50 border border-cream-border rounded-[16px] sm:rounded-[18px] px-6 py-6 sm:px-8 sm:py-[30px] flex flex-col justify-between h-auto transition-[transform,box-shadow] duration-300 ease-in-out will-change-transform hover:scale-[1.015] hover:shadow-[inset_0_0_0_1px_rgba(26,96,245,0.25)]'
				>
					<span
						aria-hidden
						className='absolute top-0 left-0 right-0 h-[3px] bg-brand/10'
					/>
					<span
						aria-hidden
						className={`min-[960px]:hidden absolute top-0 left-0 h-[3px] bg-brand transition-[width] ease-in-out ${
							i === activeIndex ? "w-full" : "w-0"
						}`}
						style={{
							transitionDuration: i === activeIndex ? "900ms" : "500ms",
						}}
					/>
					<span
						aria-hidden
						className='hidden min-[960px]:block absolute top-0 left-0 w-0 h-[3px] bg-brand transition-[width] duration-500 ease-out group-hover:w-full'
					/>
					<p>{step.desc}</p>
					<div className='flex flex-wrap justify-between items-center font-semibold text-h3 mt-4'>
						<h3>{step.title}</h3>
						<h3 className='text-brand'>{step.num}</h3>
					</div>
				</div>
			))}
		</div>
	);
}
