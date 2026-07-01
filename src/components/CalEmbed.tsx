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

  // En choisissant une date, Cal passe à la vue « heure » : il agrandit
  // l'iframe (__dimensionChanged) et scrolle la page (__routeChanged →
  // scrollIntoView). Dans un embed encadré, ça fait sauter toute la page.
  // On verrouille la position de défilement de la fenêtre pendant qu'on
  // interagit avec l'embed : tout scroll programmatique déclenché par Cal
  // est immédiatement annulé, sans empêcher le défilement interne du
  // calendrier ni le défilement normal de la page ailleurs.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let lockUntil = 0;
    let lockedY = window.scrollY;

    const arm = () => {
      const now = performance.now();
      // On ne re-mémorise la position que si on n'est pas déjà verrouillé,
      // pour ne pas capturer une position en plein milieu d'un scroll de Cal.
      if (now >= lockUntil) lockedY = window.scrollY;
      lockUntil = now + 1200;
    };

    const onScroll = () => {
      if (performance.now() < lockUntil && window.scrollY !== lockedY) {
        window.scrollTo(0, lockedY);
      }
    };

    root.addEventListener("pointerenter", arm, true);
    root.addEventListener("pointerdown", arm, true);
    root.addEventListener("mousemove", arm, true);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      root.removeEventListener("pointerenter", arm, true);
      root.removeEventListener("pointerdown", arm, true);
      root.removeEventListener("mousemove", arm, true);
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
