"use client";

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
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("modal", modal);
    window.history.pushState(null, "", url);
    // Notify ModalRoot via popstate-equivalent
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const href = (() => {
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
