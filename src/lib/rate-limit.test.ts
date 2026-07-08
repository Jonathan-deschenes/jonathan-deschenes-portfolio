import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  rateLimit,
  rateLimitResponse,
  getClientIp,
  resetRateLimit,
} from "./rate-limit";
import { ipHeader } from "@/test/helpers";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function req(headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/test", { headers });
}

beforeEach(() => {
  resetRateLimit();
  vi.useRealTimers();
});

describe("rateLimit", () => {
  it("allows the first request for a new route:ip key", () => {
    expect(rateLimit("contact", req(ipHeader("1.1.1.1"))).ok).toBe(true);
  });

  it("allows requests 2 through MAX_REQUESTS within the window", () => {
    const headers = ipHeader("1.1.1.2");
    for (let i = 0; i < MAX_REQUESTS; i++) {
      expect(rateLimit("contact", req(headers)).ok).toBe(true);
    }
  });

  it("blocks the request after MAX_REQUESTS within the window", () => {
    const headers = ipHeader("1.1.1.3");
    for (let i = 0; i < MAX_REQUESTS; i++) rateLimit("contact", req(headers));
    expect(rateLimit("contact", req(headers)).ok).toBe(false);
  });

  it("scopes the limit per route — a different route name is unaffected", () => {
    const headers = ipHeader("1.1.1.4");
    for (let i = 0; i < MAX_REQUESTS; i++) rateLimit("contact", req(headers));
    expect(rateLimit("contact", req(headers)).ok).toBe(false);
    expect(rateLimit("quote", req(headers)).ok).toBe(true);
  });

  it("scopes the limit per IP — a different IP is unaffected", () => {
    const headers = ipHeader("1.1.1.5");
    for (let i = 0; i < MAX_REQUESTS; i++) rateLimit("contact", req(headers));
    expect(rateLimit("contact", req(headers)).ok).toBe(false);
    expect(rateLimit("contact", req(ipHeader("1.1.1.6"))).ok).toBe(true);
  });

  it("resets the counter once the window has elapsed", () => {
    vi.useFakeTimers();
    const headers = ipHeader("1.1.1.7");
    for (let i = 0; i < MAX_REQUESTS; i++) rateLimit("contact", req(headers));
    expect(rateLimit("contact", req(headers)).ok).toBe(false);

    vi.advanceTimersByTime(WINDOW_MS + 1);

    expect(rateLimit("contact", req(headers)).ok).toBe(true);
    vi.useRealTimers();
  });

  it("known limitation: spoofing distinct x-forwarded-for values per request bypasses the limiter entirely (documented, not remediated)", () => {
    for (let i = 0; i < MAX_REQUESTS + 5; i++) {
      const spoofed = ipHeader(`10.0.0.${i}`);
      expect(rateLimit("contact", req(spoofed)).ok).toBe(true);
    }
  });
});

describe("getClientIp", () => {
  it("reads the first entry of a comma-separated x-forwarded-for", () => {
    expect(
      getClientIp(req({ "x-forwarded-for": "9.9.9.9, 8.8.8.8" }))
    ).toBe("9.9.9.9");
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", () => {
    expect(getClientIp(req({ "x-real-ip": "7.7.7.7" }))).toBe("7.7.7.7");
  });

  it('falls back to "unknown" when neither header is present', () => {
    expect(getClientIp(req())).toBe("unknown");
  });
});

describe("rateLimitResponse", () => {
  it("returns a 429 with the expected French message", async () => {
    const res = rateLimitResponse();
    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body.message).toBe(
      "Trop de requêtes. Veuillez réessayer dans quelques minutes."
    );
  });
});
