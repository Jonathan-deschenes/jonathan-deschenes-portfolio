import Link from "next/link";
import { ArrowRight } from "./Icons";

const weekdays = ["L", "M", "M", "J", "V", "S", "D"];

function buildDays() {
  const days: { label: string; bg: string; color: string }[] = [];
  for (let i = 0; i < 5; i++)
    days.push({ label: "", bg: "transparent", color: "transparent" });
  for (let d = 1; d <= 30; d++) {
    const col = (5 + (d - 1)) % 7;
    const weekend = col >= 5;
    let bg = weekend ? "transparent" : "rgba(26,96,245,.12)";
    let color = weekend ? "#565b65" : "#c8ccd2";
    if (d === 7) {
      bg = "#1a60f5";
      color = "#fff";
    }
    days.push({ label: String(d), bg, color });
  }
  return days;
}

export default function CalendarCard() {
  const days = buildDays();
  return (
    <div
      style={{
        justifySelf: "stretch",
        width: "100%",
        maxWidth: 430,
        marginLeft: "auto",
        background: "#121317",
        borderRadius: 22,
        padding: 24,
        boxShadow: "0 40px 80px -28px rgba(14,19,32,.5)",
      }}
      role="figure"
      aria-label="Aperçu du calendrier de réservation"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 13,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 11,
            background: "#1a60f5",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 15,
          }}
          aria-hidden
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: ".12em",
            color: "#c8ccd2",
          }}
        >
          JUIN 2026
        </div>
        <div style={{ display: "flex", gap: 7 }} aria-hidden>
          <NavBtn>&lt;</NavBtn>
          <NavBtn>&gt;</NavBtn>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 6,
          marginBottom: 10,
        }}
      >
        {weekdays.map((w, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "#6b707a",
              fontWeight: 600,
            }}
          >
            {w}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 6,
          marginBottom: 22,
        }}
      >
        {days.map((d, i) => (
          <div
            key={i}
            style={{
              height: 32,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 500,
              background: d.bg,
              color: d.color,
            }}
          >
            {d.label}
          </div>
        ))}
      </div>
      <Link
        href="/rendez-vous"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
          background: "#1a60f5",
          color: "#fff",
          fontWeight: 600,
          fontSize: 13,
          letterSpacing: ".06em",
          padding: 15,
          borderRadius: 12,
          textDecoration: "none",
        }}
      >
        RÉSERVEZ UNE RENCONTRE <ArrowRight />
      </Link>
    </div>
  );
}

function NavBtn({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 7,
        background: "#1d1f24",
        color: "#8b909a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
      }}
    >
      {children}
    </div>
  );
}
