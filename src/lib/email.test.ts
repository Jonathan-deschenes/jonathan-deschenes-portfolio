import { describe, it, expect, beforeEach, vi } from "vitest";
import { sendMock, resendModuleMock } from "@/test/mocks/resend";

vi.mock("resend", () => resendModuleMock);

import {
  sendEmail,
  escapeHtml,
  confirmationHtml,
  notifyHtml,
} from "./email";

beforeEach(() => {
  sendMock.mockReset();
});

describe("sendEmail", () => {
  it("calls resend.emails.send with the given fields and returns sent:true on success", async () => {
    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });

    const result = await sendEmail({
      to: "visitor@example.com",
      subject: "Test subject",
      html: "<p>hi</p>",
      replyTo: "reply@example.com",
    });

    expect(result).toEqual({ sent: true });
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "visitor@example.com",
        subject: "Test subject",
        html: "<p>hi</p>",
        replyTo: "reply@example.com",
      })
    );
  });

  it("throws when Resend returns an error", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "boom" } });

    await expect(
      sendEmail({ to: "a@b.com", subject: "s", html: "<p/>" })
    ).rejects.toThrow("boom");
  });

  it("returns a dry-run result without calling Resend when RESEND_API_KEY is unset", async () => {
    vi.resetModules();
    vi.stubEnv("RESEND_API_KEY", "");
    const fresh = await import("./email");

    const result = await fresh.sendEmail({
      to: "a@b.com",
      subject: "s",
      html: "<p/>",
    });

    expect(result).toEqual({ sent: false, dryRun: true });
    expect(sendMock).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
    vi.resetModules();
  });
});

describe("escapeHtml", () => {
  it("escapes &, <, >, \", and '", () => {
    expect(escapeHtml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&#39;");
  });

  it("leaves normal text untouched", () => {
    expect(escapeHtml("Jonathan Deschênes")).toBe("Jonathan Deschênes");
  });
});

describe("confirmationHtml / notifyHtml", () => {
  it("escapes a script-injection payload in the name field", () => {
    const html = confirmationHtml({
      name: "<script>alert(1)</script>",
      intro: "intro text",
    });
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).not.toContain("<script>alert(1)</script>");
  });

  it("escapes a script-injection payload in notification bullets", () => {
    const html = notifyHtml({
      title: "Nouveau message",
      bullets: [{ label: "Message", value: "<script>alert(2)</script>" }],
    });
    expect(html).toContain("&lt;script&gt;alert(2)&lt;/script&gt;");
    expect(html).not.toContain("<script>alert(2)</script>");
  });
});
