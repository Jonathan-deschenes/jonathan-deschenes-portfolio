"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: "md" | "lg" | "xl";
  children: React.ReactNode;
};

const widths = { md: 540, lg: 720, xl: 1000 } as const;

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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(14,19,32,.55)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "5vh 16px",
        overflowY: "auto",
        animation: "modal-fade 180ms ease",
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 18,
          width: "100%",
          maxWidth: widths[size],
          boxShadow: "0 40px 80px -28px rgba(14,19,32,.5)",
          outline: "none",
          animation: "modal-rise 220ms cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid #ececed",
          }}
        >
          <h2
            style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-.01em" }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 6,
              borderRadius: 8,
              color: "#5b626e",
              fontSize: 0,
            }}
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
        <div style={{ padding: 24 }}>{children}</div>
      </div>
      <style>{`
        @keyframes modal-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-rise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
