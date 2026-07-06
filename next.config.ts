import type { NextConfig } from "next";

// 'unsafe-inline' : requis par les scripts inline de Next et le JSON-LD.
// 'unsafe-eval' en dev seulement : Next/React (Fast Refresh, overlay d'erreurs)
// utilise eval() en développement, mais jamais en production.
// Domaines cal.com : requis par l'embed @calcom/embed-react (script, iframe,
// appels réseau et polices).
const isDev = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://app.cal.com https://*.cal.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://*.cal.com",
  "connect-src 'self' https://*.cal.com",
  "frame-src https://app.cal.com https://cal.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
