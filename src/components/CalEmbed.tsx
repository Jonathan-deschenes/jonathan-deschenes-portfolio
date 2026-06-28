"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useId } from "react";

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
}: {
  url: string;
  namespace?: string;
}) {
  const generated = useId();
  // Cal namespace must be filesystem/url safe — strip the React-generated colons
  const ns = (namespace ?? `cal-${generated}`).replace(/[^a-zA-Z0-9_-]/g, "");
  const calLink = extractCalLink(url);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: ns });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#1a60f5" },
          dark: { "cal-brand": "#1a60f5" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [ns]);

  return (
    <Cal
      namespace={ns}
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
