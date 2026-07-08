// NOTE: this route is not currently wired to any UI — the live booking flow
// on the site is entirely the Cal.com embed (see src/components/CalEmbed.tsx
// and src/app/rendez-vous/page.tsx). No form ever POSTs here today; this
// route only exists as a fallback/future webhook target. These tests
// validate the endpoint's own logic in isolation, not a real user flow.

import { describe, it, expect, beforeEach, vi } from "vitest";
import { sendMock, resendModuleMock, mockResendSuccess, mockResendFailure } from "@/test/mocks/resend";

vi.mock("resend", () => resendModuleMock);

import { POST } from "./route";
import { resetRateLimit } from "@/lib/rate-limit";
import { jsonRequest, rawRequest, ipHeader } from "@/test/helpers";

const URL = "http://localhost/api/booking";

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  need: "Automatisation",
  timeline: "Dans 1 à 3 mois",
  goal: "Réduire le temps de collecte de documents clients.",
};

beforeEach(() => {
  sendMock.mockReset();
  resetRateLimit();
  mockResendSuccess();
});

describe("POST /api/booking", () => {
  it("valid payload: returns 200 ok and sends visitor confirmation + owner notification", async () => {
    const res = await POST(jsonRequest(URL, validPayload, ipHeader("4.4.4.1")));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    expect(sendMock).toHaveBeenCalledTimes(2);
    const [visitorCall, ownerCall] = sendMock.mock.calls.map((c) => c[0]);
    expect(visitorCall).toMatchObject({
      to: validPayload.email,
      subject: "Confirmation : votre rencontre est en cours de planification",
    });
    expect(ownerCall).toMatchObject({
      to: "owner@example.com",
      subject: `Nouvelle réservation — ${validPayload.name} (${validPayload.need})`,
      replyTo: validPayload.email,
    });
  });

  it("invalid payload (goal too short): returns 400 and sends no emails", async () => {
    const res = await POST(
      jsonRequest(URL, { ...validPayload, goal: "hi" }, ipHeader("4.4.4.2"))
    );
    expect(res.status).toBe(400);
    expect((await res.json()).message).toBe(
      "Veuillez remplir les champs requis correctement."
    );
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("malformed JSON body: returns 400 and sends no emails", async () => {
    const res = await POST(rawRequest(URL, "{not json", ipHeader("4.4.4.3")));
    expect(res.status).toBe(400);
    expect((await res.json()).message).toBe("Corps de requête invalide.");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("honeypot filled: returns 200 ok silently and sends no emails", async () => {
    const res = await POST(
      jsonRequest(URL, { ...validPayload, website: "http://spam.example" }, ipHeader("4.4.4.4"))
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate limit: 6th request from the same IP returns 429; a different route/IP is unaffected", async () => {
    const headers = ipHeader("4.4.4.5");
    for (let i = 0; i < 5; i++) {
      const res = await POST(jsonRequest(URL, validPayload, headers));
      expect(res.status).toBe(200);
    }
    const blocked = await POST(jsonRequest(URL, validPayload, headers));
    expect(blocked.status).toBe(429);

    const otherIp = await POST(jsonRequest(URL, validPayload, ipHeader("4.4.4.6")));
    expect(otherIp.status).toBe(200);
  });

  it("email send failure: returns 202 with the soft-failure message", async () => {
    mockResendFailure("send failed");
    const res = await POST(jsonRequest(URL, validPayload, ipHeader("4.4.4.7")));
    expect(res.status).toBe(202);
    expect((await res.json()).message).toBe(
      "Réservation reçue mais l'envoi du courriel de confirmation a échoué."
    );
  });

  it("escapes HTML/script injection in the email content sent to Resend", async () => {
    const res = await POST(
      jsonRequest(
        URL,
        { ...validPayload, name: "<script>alert(1)</script>" },
        ipHeader("4.4.4.8")
      )
    );
    expect(res.status).toBe(200);
    const htmlBodies = sendMock.mock.calls.map((c) => c[0].html).join("\n");
    expect(htmlBodies).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(htmlBodies).not.toContain("<script>alert(1)</script>");
  });

  it("boundary lengths: name/goal at min pass, one below min fails", async () => {
    const atMin = await POST(
      jsonRequest(URL, { ...validPayload, name: "ab", goal: "abcde" }, ipHeader("4.4.4.9"))
    );
    expect(atMin.status).toBe(200);

    const belowMin = await POST(
      jsonRequest(URL, { ...validPayload, name: "a" }, ipHeader("4.4.4.10"))
    );
    expect(belowMin.status).toBe(400);
  });

  it("FLAGGED FINDING (not remediated, out of scope): a forged payload with no webhook signature header is accepted identically to a legitimate one — this route has no HMAC verification (see route.ts's own comment). If this endpoint is ever wired as a real Cal.com webhook target, add x-cal-signature-256 verification before trusting the body.", async () => {
    const res = await POST(jsonRequest(URL, validPayload, ipHeader("4.4.4.11")));
    expect(res.status).toBe(200);
  });
});
