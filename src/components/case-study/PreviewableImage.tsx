"use client";

import Image from "next/image";

type Props = {
	src: string;
	alt: string;
	width: number;
	height: number;
	sizes?: string;
	className?: string;
	priority?: boolean;
};

export default function PreviewableImage({ src, alt, ...rest }: Props) {
	const onClick = () => {
		const url = new URL(window.location.href);
		url.searchParams.set("modal", "preview");
		url.searchParams.set("id", src);
		window.history.pushState(null, "", url);
		window.dispatchEvent(new PopStateEvent("popstate"));
	};

	return (
		<button
			type='button'
			onClick={onClick}
			aria-label={`Agrandir : ${alt}`}
			className='block w-full h-full text-left p-0 border-0 bg-transparent cursor-zoom-in'
		>
			<Image src={src} alt={alt} {...rest} />
		</button>
	);
}
