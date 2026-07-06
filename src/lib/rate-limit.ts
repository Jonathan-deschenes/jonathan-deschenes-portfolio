// Limiteur de requêtes en mémoire, à fenêtre fixe, par IP et par route.
// Limite connue : sur Vercel, chaque instance serverless a sa propre mémoire,
// les compteurs ne sont donc pas partagés entre instances. Suffisant au volume
// actuel; passer à un stockage partagé (ex. Upstash Ratelimit) si le trafic
// le justifie.

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // par IP, par route, par fenêtre

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

function prune(now: number) {
  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) buckets.delete(key);
  }
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function rateLimit(route: string, req: Request): { ok: boolean } {
  const now = Date.now();
  prune(now);

  const key = `${route}:${getClientIp(req)}`;
  const entry = buckets.get(key);
  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  entry.count += 1;
  return { ok: entry.count <= MAX_REQUESTS };
}

export function rateLimitResponse() {
  return Response.json(
    { message: "Trop de requêtes. Veuillez réessayer dans quelques minutes." },
    { status: 429 }
  );
}
