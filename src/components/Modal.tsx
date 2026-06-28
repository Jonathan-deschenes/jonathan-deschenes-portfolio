"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: "md" | "lg" | "xl";
  children: React.ReactNode;
};

const widths = { md: "max-w-[540px]", lg: "max-w-[720px]", xl: "max-w-[1000px]" } as const;

export default function Modal({
  open,
  onClose,
  title,
  size = "lg",
  children,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    queueMicrotask(() => dialogRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-[rgba(14,19,32,.55)] backdrop-blur-[4px] flex items-start justify-center px-4 py-[5vh] overflow-y-auto animate-[modal-fade_180ms_ease]"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-[18px] w-full ${widths[size]} shadow-card outline-none animate-[modal-rise_220ms_cubic-bezier(.2,.7,.2,1)]`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-bold text-[18px] tracking-[-.01em]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="border-0 bg-transparent cursor-pointer p-1.5 rounded-lg text-muted text-[0px] hover:bg-cream"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
