import { describe, it, expect, beforeEach, vi } from "vitest";
import { sendMock, resendModuleMock, mockResendSuccess, mockResendFailure } from "@/test/mocks/resend";

vi.mock("resend", () => resendModuleMock);

import { POST } from "./route";
import { resetRateLimit } from "@/lib/rate-limit";
import { jsonRequest, rawRequest, ipHeader } from "@/test/helpers";

const URL = "http://localhost/api/quote";

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  need: "Site web",
  timeline: "Dès que possible",
  message: "Décrivez votre projet ou le problème à régler ici svp.",
};

beforeEach(() => {
  sendMock.mockReset();
  resetRateLimit();
  mockResendSuccess();
});

describe("POST /api/quote", () => {
  it("valid payload: returns 200 ok and sends visitor confirmation + owner notification", async () => {
    const res = await POST(jsonRequest(URL, validPayload, ipHeader("3.3.3.1")));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    expect(sendMock).toHaveBeenCalledTimes(2);
    const [visitorCall, ownerCall] = sendMock.mock.calls.map((c) => c[0]);
    expect(visitorCall).toMatchObject({
      to: validPayload.email,
      subject: "Confirmation : votre demande de soumission",
    });
    expect(ownerCall).toMatchObject({
      to: "owner@example.com",
      subject: `Nouvelle soumission — ${validPayload.name} (${validPayload.need})`,
      replyTo: validPayload.email,
    });
  });

  it("optional fields omitted: notification bullets fall back to em dash", async () => {
    await POST(jsonRequest(URL, validPayload, ipHeader("3.3.3.2")));
    const ownerHtml = sendMock.mock.calls[1][0].html as string;
    expect(ownerHtml).toContain("—");
  });

  it("invalid payload (message too short): returns 400 and sends no emails", async () => {
    const res = await POST(
      jsonRequest(URL, { ...validPayload, message: "short" }, ipHeader("3.3.3.3"))
    );
    expect(res.status).toBe(400);
    expect((await res.json()).message).toBe(
      "Veuillez remplir les champs requis correctement."
    );
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("malformed JSON body: returns 400 and sends no emails", async () => {
    const res = await POST(rawRequest(URL, "{not json", ipHeader("3.3.3.4")));
    expect(res.status).toBe(400);
    expect((await res.json()).message).toBe("Corps de requête invalide.");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("honeypot filled: returns 200 ok silently and sends no emails", async () => {
    const res = await POST(
      jsonRequest(URL, { ...validPayload, website: "http://spam.example" }, ipHeader("3.3.3.5"))
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate limit: 6th request from the same IP returns 429; a different route/IP is unaffected", async () => {
    const headers = ipHeader("3.3.3.6");
    for (let i = 0; i < 5; i++) {
      const res = await POST(jsonRequest(URL, validPayload, headers));
      expect(res.status).toBe(200);
    }
    const blocked = await POST(jsonRequest(URL, validPayload, headers));
    expect(blocked.status).toBe(429);

    const otherIp = await POST(jsonRequest(URL, validPayload, ipHeader("3.3.3.7")));
    expect(otherIp.status).toBe(200);
  });

  it("email send failure: returns 202 with the soft-failure message", async () => {
    mockResendFailure("send failed");
    const res = await POST(jsonRequest(URL, validPayload, ipHeader("3.3.3.8")));
    expect(res.status).toBe(202);
    expect((await res.json()).message).toBe(
      "Votre demande a été reçue mais l'envoi du courriel de confirmation a échoué. Je vous reviens sous peu."
    );
  });

  it("escapes HTML/script injection in the email content sent to Resend", async () => {
    const res = await POST(
      jsonRequest(
        URL,
        { ...validPayload, message: "<script>alert(1)</script> " + validPayload.message },
        ipHeader("3.3.3.9")
      )
    );
    expect(res.status).toBe(200);
    const htmlBodies = sendMock.mock.calls.map((c) => c[0].html).join("\n");
    expect(htmlBodies).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(htmlBodies).not.toContain("<script>alert(1)</script>");
  });

  it("boundary lengths: name/message at min pass, one below min fails", async () => {
    const atMin = await POST(
      jsonRequest(URL, { ...validPayload, name: "ab", message: "0123456789" }, ipHeader("3.3.3.10"))
    );
    expect(atMin.status).toBe(200);

    const belowMin = await POST(
      jsonRequest(URL, { ...validPayload, name: "a" }, ipHeader("3.3.3.11"))
    );
    expect(belowMin.status).toBe(400);
  });
});
