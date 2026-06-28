"use client";

import { useState } from "react";
import { ChevronDown } from "./Icons";
import type { Faq as FaqType } from "@/lib/data";

export default function Faq({ items }: { items: FaqType[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-[840px] mx-auto">
      {items.map((q, i) => {
        const isOpen = open === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-btn-${i}`;
        return (
          <div key={i} className="border-b border-border">
            <button
              id={btnId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full bg-transparent border-0 cursor-pointer flex items-center justify-between gap-5 py-[26px] px-1 text-left text-inherit font-inherit"
            >
              <span className="font-semibold text-[17px]">{q.question}</span>
              <span
                className={`text-faint flex-none inline-flex leading-none transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
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
              className="overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-in-out"
              style={{
                maxHeight: isOpen ? 1000 : 0,
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p className="text-[15.5px] leading-[1.65] text-muted px-1 pb-[26px] max-w-[760px]">
                {q.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
