"use client";

import { useState } from "react";
import { ChevronDown } from "./Icons";
import type { Faq as FaqType } from "@/lib/data";

export default function Faq({ items }: { items: FaqType[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ maxWidth: 840, margin: "0 auto" }}>
      {items.map((q, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-btn-${i}`;
        return (
          <div key={i} style={{ borderBottom: "1px solid #ececec" }}>
            <button
              id={btnId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                padding: "26px 4px",
                textAlign: "left",
                color: "inherit",
                font: "inherit",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: 17 }}>{q.question}</span>
              <span
                style={{
                  color: "#9aa1ad",
                  flex: "none",
                  transition: "transform .3s ease",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  display: "inline-flex",
                  lineHeight: 0,
                }}
                aria-hidden
              >
                <ChevronDown />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              style={{
                maxHeight: isOpen ? 1000 : 0,
                overflow: "hidden",
                opacity: isOpen ? 1 : 0,
                transition:
                  "max-height .38s ease, opacity .3s ease, padding .25s ease",
              }}
            >
              <p
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.65,
                  color: "#5b626e",
                  padding: "0 4px 26px",
                  maxWidth: 760,
                }}
              >
                {q.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
