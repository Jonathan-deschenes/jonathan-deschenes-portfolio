import { Resend } from "resend";
import { site } from "./site";

const apiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.RESEND_FROM || `Jonathan Deschênes <${site.email}>`;
const internalNotify = process.env.NOTIFY_EMAIL || site.email;

type Payload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, text, replyTo }: Payload) {
  if (!apiKey) {
    console.warn(
      "[email] RESEND_API_KEY non configurée — courriel non envoyé. Sujet:",
      subject
    );
    return { sent: false, dryRun: true };
  }
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromAddress,
    to,
    subject,
    html,
    text,
    replyTo,
  });
  if (error) throw new Error(error.message);
  return { sent: true };
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function confirmationHtml({
  name,
  intro,
  bullets,
}: {
  name: string;
  intro: string;
  bullets?: { label: string; value: string }[];
}) {
  const safeName = escapeHtml(name);
  const list = bullets
    ? `<ul style="padding-left:18px;margin:14px 0">${bullets
        .map(
          (b) =>
            `<li style="margin:6px 0"><strong>${escapeHtml(
              b.label
            )} :</strong> ${escapeHtml(b.value)}</li>`
        )
        .join("")}</ul>`
    : "";
  return `<!doctype html><html lang="fr"><body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0e1320;background:#f6f6f2;padding:32px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;padding:32px;border:1px solid #ececed">
    <h1 style="margin:0 0 12px;font-size:22px">Bonjour ${safeName},</h1>
    <p style="margin:0 0 14px;line-height:1.6;color:#3a414d">${escapeHtml(intro)}</p>
    ${list}
    <p style="margin:18px 0 6px;line-height:1.6;color:#3a414d">Je vous recontacte sous 24-48 h ouvrables.</p>
    <p style="margin:14px 0 0;line-height:1.6;color:#3a414d">Cordialement,<br>Jonathan Deschênes</p>
  </div>
  <p style="text-align:center;color:#9aa1ad;font-size:12px;margin-top:20px">© ${new Date().getFullYear()} ${site.name}</p>
</body></html>`;
}

export function notifyHtml({
  title,
  bullets,
}: {
  title: string;
  bullets: { label: string; value: string }[];
}) {
  const list = bullets
    .map(
      (b) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5b626e;font-size:13px;vertical-align:top"><strong>${escapeHtml(
          b.label
        )}</strong></td><td style="padding:6px 0;color:#0e1320;font-size:14px">${escapeHtml(
          b.value
        )}</td></tr>`
    )
    .join("");
  return `<!doctype html><html lang="fr"><body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0e1320;background:#fff;padding:24px">
  <div style="max-width:620px;margin:0 auto">
    <h2 style="margin:0 0 14px;font-size:18px">${escapeHtml(title)}</h2>
    <table style="border-collapse:collapse;width:100%">${list}</table>
  </div>
</body></html>`;
}

export const notifyTo = internalNotify;
