import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 17): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

export function ArrowRight({ size = 17, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDown({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={2} {...rest}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ImagePlaceholder({ size = 30, ...rest }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.6} {...rest}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

export function IconDoc({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...rest}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h8M8 9h2" />
    </svg>
  );
}

export function IconClock({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function IconLayout({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...rest}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M3 9h6" />
    </svg>
  );
}

export function IconCalendar({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...rest}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function IconUser({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...rest}>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function IconAi({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...rest}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
    </svg>
  );
}

export function IconCode({ size = 20, ...rest }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={1.8} {...rest}>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </svg>
  );
}

const map = {
  doc: IconDoc,
  clock: IconClock,
  layout: IconLayout,
  calendar: IconCalendar,
  user: IconUser,
  ai: IconAi,
  code: IconCode,
} as const;

export type IconName = keyof typeof map;

export function Icon({
  name,
  ...rest
}: { name: IconName } & IconProps) {
  const Cmp = map[name];
  return <Cmp {...rest} />;
}
