"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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

  if (!open || typeof document === "undefined") return null;

  // Rendu via portail sur <body> : indispensable pour que `position: fixed`
  // couvre bien tout l'écran. Sinon, si un ancêtre porte un `transform`
  // (ex. l'animation `anim-in` du hero), le modal serait « piégé » dans cet
  // ancêtre au lieu de s'afficher plein écran.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-[rgba(14,19,32,.55)] backdrop-blur-[4px] flex items-start sm:items-center justify-center px-2 sm:px-4 py-2 sm:py-[5vh] overscroll-contain animate-[modal-fade_180ms_ease]"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-[14px] sm:rounded-[18px] w-full ${widths[size]} max-h-full shadow-card outline-none animate-[modal-rise_220ms_cubic-bezier(.2,.7,.2,1)] flex flex-col overflow-hidden`}
      >
        <div className="flex-none flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-border bg-white rounded-t-[14px] sm:rounded-t-[18px]">
          <h2 className="font-bold text-[16px] sm:text-[18px] tracking-[-.01em] min-w-0 truncate">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="border-0 bg-transparent cursor-pointer p-2 -mr-2 rounded-lg text-muted text-[0px] hover:bg-cream flex-none"
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
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
