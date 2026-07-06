"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useId, useRef } from "react";

// Remplace `scrollIntoView` de <cal-inline> pour empêcher Cal de faire sauter
// la page parente au choix d'une date. Défini une fois pour pouvoir comparer
// l'identité (éviter de re-patcher inutilement).
const noop = () => {};

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

  // En choisissant une date, Cal navigue (« __routeChanged ») et, si l'embed a
  // défilé un peu hors de l'écran, appelle `inlineEl.scrollIntoView()` — c'est
  // LE seul et unique endroit où Cal fait bouger la page parente (vérifié dans
  // @calcom/embed-core : aucun autre scrollTo/scrollBy). Ce saut automatique est
  // désagréable et entrait en conflit avec le défilement de l'utilisateur.
  //
  // Plutôt que de surveiller la fenêtre et d'annuler le scroll après coup (ce
  // qui finit toujours par se battre avec l'utilisateur, surtout au-dessus d'une
  // iframe qui « avale » les évènements molette), on neutralise l'appel à la
  // source : on remplace `scrollIntoView` par une fonction vide sur l'élément
  // <cal-inline>. Cet élément n'est jamais scrollé par autre chose que Cal, donc
  // c'est chirurgical : le défilement de l'utilisateur n'est plus jamais touché.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const neutralize = () => {
      const inline = root.querySelector("cal-inline") as HTMLElement | null;
      if (inline && inline.scrollIntoView !== noop) {
        inline.scrollIntoView = noop;
        return true;
      }
      return false;
    };

    // <cal-inline> est injecté de façon asynchrone : on le neutralise dès qu'il
    // apparaît (et on reste à l'écoute au cas où il serait recréé).
    neutralize();
    const observer = new MutationObserver(() => neutralize());
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
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
