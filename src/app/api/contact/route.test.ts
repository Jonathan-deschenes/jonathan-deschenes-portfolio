import { describe, it, expect, beforeEach, vi } from "vitest";
import { sendMock, resendModuleMock, mockResendSuccess, mockResendFailure } from "@/test/mocks/resend";

vi.mock("resend", () => resendModuleMock);

import { POST } from "./route";
import { resetRateLimit } from "@/lib/rate-limit";
import { jsonRequest, rawRequest, ipHeader } from "@/test/helpers";

const URL = "http://localhost/api/contact";

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "Question sur vos services",
  message: "Bonjour, j'aimerais en savoir plus sur vos services.",
};

beforeEach(() => {
  sendMock.mockReset();
  resetRateLimit();
  mockResendSuccess();
});

describe("POST /api/contact", () => {
  it("valid payload: returns 200 ok and sends visitor confirmation + owner notification", async () => {
    const res = await POST(jsonRequest(URL, validPayload, ipHeader("2.2.2.1")));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    expect(sendMock).toHaveBeenCalledTimes(2);

    const [visitorCall, ownerCall] = sendMock.mock.calls.map((c) => c[0]);
    expect(visitorCall).toMatchObject({
      to: validPayload.email,
      subject: "Confirmation : votre message a été reçu",
    });
    expect(ownerCall).toMatchObject({
      to: "owner@example.com",
      subject: `Nouveau message — ${validPayload.subject}`,
      replyTo: validPayload.email,
    });
  });

  it("invalid payload (bad email): returns 400 and sends no emails", async () => {
    const res = await POST(
      jsonRequest(URL, { ...validPayload, email: "not-an-email" }, ipHeader("2.2.2.2"))
    );
    expect(res.status).toBe(400);
    expect((await res.json()).message).toBe(
      "Veuillez remplir les champs requis correctement."
    );
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("malformed JSON body: returns 400 and sends no emails", async () => {
    const res = await POST(rawRequest(URL, "{not json", ipHeader("2.2.2.3")));
    expect(res.status).toBe(400);
    expect((await res.json()).message).toBe("Corps de requête invalide.");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("honeypot filled: returns 200 ok silently and sends no emails", async () => {
    const res = await POST(
      jsonRequest(URL, { ...validPayload, website: "http://spam.example" }, ipHeader("2.2.2.4"))
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rate limit: 6th request from the same IP returns 429; a different IP is unaffected", async () => {
    const headers = ipHeader("2.2.2.5");
    for (let i = 0; i < 5; i++) {
      const res = await POST(jsonRequest(URL, validPayload, headers));
      expect(res.status).toBe(200);
    }
    const blocked = await POST(jsonRequest(URL, validPayload, headers));
    expect(blocked.status).toBe(429);

    const otherIp = await POST(jsonRequest(URL, validPayload, ipHeader("2.2.2.6")));
    expect(otherIp.status).toBe(200);
  });

  it("email send failure: returns 202 with the soft-failure message", async () => {
    mockResendFailure("send failed");
    const res = await POST(jsonRequest(URL, validPayload, ipHeader("2.2.2.7")));
    expect(res.status).toBe(202);
    expect((await res.json()).message).toBe(
      "Message reçu mais l'envoi du courriel de confirmation a échoué. Je vous reviens rapidement."
    );
  });

  it("escapes HTML/script injection in the email content sent to Resend", async () => {
    const res = await POST(
      jsonRequest(
        URL,
        { ...validPayload, name: "<script>alert(1)</script>" },
        ipHeader("2.2.2.8")
      )
    );
    expect(res.status).toBe(200);
    const htmlBodies = sendMock.mock.calls.map((c) => c[0].html).join("\n");
    expect(htmlBodies).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(htmlBodies).not.toContain("<script>alert(1)</script>");
  });

  it("boundary lengths: subject/message at min and max pass, one below min fails", async () => {
    const atMin = await POST(
      jsonRequest(URL, { ...validPayload, subject: "ab", message: "abcde" }, ipHeader("2.2.2.9"))
    );
    expect(atMin.status).toBe(200);

    const belowMin = await POST(
      jsonRequest(URL, { ...validPayload, subject: "a" }, ipHeader("2.2.2.10"))
    );
    expect(belowMin.status).toBe(400);
  });
});
