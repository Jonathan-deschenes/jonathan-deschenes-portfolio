"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useId, useRef } from "react";

function extractCalLink(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    return url.replace(/^\/+|\/+$/g, "");
  }
}

export default function CalEmbed({
  url,
  namespace,
  hideEventTypeDetails = false,
}: {
  url: string;
  namespace?: string;
  hideEventTypeDetails?: boolean;
}) {
  const generated = useId();
  const ns = (namespace ?? `cal-${generated}`).replace(/[^a-zA-Z0-9_-]/g, "");
  const calLink = extractCalLink(url);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: ns });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#1a60f5" },
          dark: { "cal-brand": "#1a60f5" },
        },
        hideEventTypeDetails,
        layout: "month_view",
      });
    })();
  }, [ns, hideEventTypeDetails]);

  // En choisissant une date, Cal passe à la vue « heure » et scrolle la page
  // (__routeChanged → scrollIntoView). Dans un embed encadré, ça fait sauter
  // toute la page. On annule uniquement ce scroll *programmatique* : un scroll
  // provoqué par un vrai geste de l'utilisateur (molette, tactile, touches) est
  // toujours respecté, même si le curseur est au-dessus du calendrier.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Position réellement voulue par l'utilisateur (mise à jour à chaque
    // défilement légitime).
    let intendedY = window.scrollY;
    // Horodatage du dernier vrai geste de défilement de l'utilisateur.
    let lastGestureAt = -Infinity;
    // Fenêtre pendant laquelle un scroll de Cal peut suivre un clic dans l'embed.
    let embedActiveUntil = 0;

    const SCROLL_KEYS = new Set([
      "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ",
    ]);

    const markGesture = () => {
      lastGestureAt = performance.now();
    };
    const markKey = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) lastGestureAt = performance.now();
    };
    const markEmbed = () => {
      embedActiveUntil = performance.now() + 1000;
    };

    const onScroll = () => {
      const now = performance.now();
      const userDriven = now - lastGestureAt < 250;
      const embedContext =
        now < embedActiveUntil ||
        root.matches(":hover") ||
        root.contains(document.activeElement);

      // On n'annule que si le scroll n'a pas de geste utilisateur derrière lui
      // ET qu'il provient du contexte de l'embed (donc un scroll auto de Cal).
      if (!userDriven && embedContext) {
        if (window.scrollY !== intendedY) window.scrollTo(0, intendedY);
      } else {
        intendedY = window.scrollY;
      }
    };

    window.addEventListener("wheel", markGesture, { passive: true });
    window.addEventListener("touchmove", markGesture, { passive: true });
    window.addEventListener("keydown", markKey, true);
    root.addEventListener("pointerdown", markEmbed, true);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", markGesture);
      window.removeEventListener("touchmove", markGesture);
      window.removeEventListener("keydown", markKey, true);
      root.removeEventListener("pointerdown", markEmbed, true);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Cal
        namespace={ns}
        calLink={calLink}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
