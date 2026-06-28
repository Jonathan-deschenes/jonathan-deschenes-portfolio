import { ArrowRight } from "./Icons";
import ModalLink from "./ModalLink";

export default function FloatingCta() {
  return (
    <ModalLink
      modal="booking"
      ariaLabel="Réserver une rencontre gratuite"
      className="floating-cta fixed right-7 bottom-7 z-[60] inline-flex items-center gap-[9px] bg-brand text-white text-[14px] font-semibold px-[22px] py-[13px] rounded-[13px] no-underline shadow-[0_14px_34px_rgba(26,96,245,.4)]"
    >
      Réserver une rencontre gratuite <ArrowRight />
    </ModalLink>
  );
}
