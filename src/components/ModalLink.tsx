"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  modal: "booking" | "quote" | "contact";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  ariaLabel?: string;
};

export default function ModalLink({
  modal,
  className,
  style,
  children,
  ariaLabel,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params.toString());
    next.set("modal", modal);
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const href = (() => {
    // SEO-friendly fallback link in case JS is disabled
    if (modal === "booking") return "/rendez-vous";
    if (modal === "quote") return "/soumission";
    return "/contact";
  })();

  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
