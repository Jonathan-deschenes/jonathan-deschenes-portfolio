"use client";

import { useMemo, useState } from "react";

function openBookingModal() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set("modal", "booking");
  window.history.pushState(null, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
const MONTHS = [
  "JANVIER", "FÉVRIER", "MARS", "AVRIL", "MAI", "JUIN",
  "JUILLET", "AOÛT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DÉCEMBRE",
];

type Cell = {
  day: number | null;
  available: boolean;
  featured: boolean;
};

export default function BookingCalendarPreview({
  className = "",
}: {
  className?: string;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  // On limite la navigation : du mois courant jusqu'à +3 mois.
  const minMonthIndex = today.getFullYear() * 12 + today.getMonth();
  const viewMonthIndex = view.year * 12 + view.month;
  const canPrev = viewMonthIndex > minMonthIndex;
  const canNext = viewMonthIndex < minMonthIndex + 3;

  const shiftMonth = (delta: number) => {
    setView((v) => {
      const idx = v.year * 12 + v.month + delta;
      if (idx < minMonthIndex || idx > minMonthIndex + 3) return v;
      return { year: Math.floor(idx / 12), month: idx % 12 };
    });
  };

  const cells: Cell[] = useMemo(() => {
    const firstDow = (new Date(view.year, view.month, 1).getDay() + 6) % 7; // lundi = 0
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

    const list: Cell[] = [];
    for (let i = 0; i < firstDow; i++) {
      list.push({ day: null, available: false, featured: false });
    }
    let firstAvailable = -1;
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(view.year, view.month, d);
      const dow = (date.getDay() + 6) % 7;
      const isWeekend = dow >= 5;
      const isPast = date < today;
      const available = !isWeekend && !isPast;
      if (available && firstAvailable === -1) firstAvailable = list.length;
      list.push({ day: d, available, featured: false });
    }
    // Première plage disponible mise en évidence (jour "sélectionné").
    if (firstAvailable >= 0) list[firstAvailable].featured = true;
    return list;
  }, [view, today]);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        background: "#121317",
        borderRadius: 22,
        padding: 24,
        boxShadow: "0 40px 80px -28px rgba(14,19,32,.5)",
      }}
    >
      {/* En-tête */}
      <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 24 }}>
        <div
          style={{
            width: 42, height: 42, borderRadius: 11, background: "#1a60f5",
            color: "#fff", display: "flex", alignItems: "center",
            justifyContent: "center", fontWeight: 700, fontSize: 15,
          }}
        >
          JD
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>
            Jonathan Deschênes
          </div>
          <div style={{ color: "#7c828d", fontSize: 13, marginTop: 2 }}>
            Rencontre gratuite · 30 min
          </div>
        </div>
      </div>

      {/* Navigation de mois */}
      <div
        style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: 16,
        }}
      >
        <div
          style={{
            fontWeight: 600, fontSize: 13, letterSpacing: ".12em", color: "#c8ccd2",
          }}
        >
          {MONTHS[view.month]} {view.year}
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            disabled={!canPrev}
            aria-label="Mois précédent"
            style={{
              width: 28, height: 28, borderRadius: 7, border: "none",
              background: "#1d1f24", color: "#8b909a", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 13,
              cursor: canPrev ? "pointer" : "not-allowed",
              opacity: canPrev ? 1 : 0.4,
            }}
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            disabled={!canNext}
            aria-label="Mois suivant"
            style={{
              width: 28, height: 28, borderRadius: 7, border: "none",
              background: "#1d1f24", color: "#8b909a", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 13,
              cursor: canNext ? "pointer" : "not-allowed",
              opacity: canNext ? 1 : 0.4,
            }}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Jours de la semaine */}
      <div
        style={{
          display: "grid", gridTemplateColumns: "repeat(7,1fr)",
          gap: 6, marginBottom: 10,
        }}
      >
        {WEEKDAYS.map((wd, i) => (
          <div
            key={i}
            style={{ textAlign: "center", fontSize: 11, color: "#6b707a", fontWeight: 600 }}
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Grille des jours */}
      <div
        style={{
          display: "grid", gridTemplateColumns: "repeat(7,1fr)",
          gap: 6, marginBottom: 22,
        }}
      >
        {cells.map((c, i) => {
          if (c.day === null) {
            return <div key={i} style={{ height: 32 }} />;
          }
          const bg = c.featured
            ? "#1a60f5"
            : c.available
              ? "rgba(26,96,245,.12)"
              : "transparent";
          const color = c.featured
            ? "#fff"
            : c.available
              ? "#c8ccd2"
              : "#565b65";
          const base = {
            height: 32, borderRadius: 8, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 500, background: bg, color,
          } as const;

          if (!c.available) {
            return (
              <div key={i} style={base}>
                {c.day}
              </div>
            );
          }
          return (
            <button
              key={i}
              type="button"
              onClick={openBookingModal}
              aria-label={`Réserver le ${c.day} ${MONTHS[view.month].toLowerCase()}`}
              style={{ ...base, border: "none", cursor: "pointer" }}
            >
              {c.day}
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={openBookingModal}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "center", gap: 9, background: "#1a60f5",
          color: "#fff", fontWeight: 600, fontSize: 13, letterSpacing: ".06em",
          padding: 15, borderRadius: 12, border: "none", cursor: "pointer",
        }}
      >
        RÉSERVEZ UNE RENCONTRE
        <svg
          width="17" height="17" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
