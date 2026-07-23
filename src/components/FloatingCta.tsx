import { Calendar } from "lucide-react";
import { ArrowRight } from "./Icons";
import ModalLink from "./ModalLink";

export default function FloatingCta() {
	return (
		<ModalLink
			modal='booking'
			ariaLabel='Réserver une rencontre gratuite'
			className='floating-cta fixed right-7 bottom-20 z-[60] inline-flex items-center gap-[9px] bg-brand text-white text-control font-semibold px-[22px] py-[13px] rounded-[13px] no-underline shadow-[0_14px_34px_rgba(26,96,245,.4)]'
		>
			<Calendar className='md:hidden' />
			<span className='hidden md:inline-flex md:gap-1 md:items-center'>
				Réserver une rencontre gratuite <ArrowRight />
			</span>
		</ModalLink>
	);
}
