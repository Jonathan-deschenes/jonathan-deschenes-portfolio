import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import {
  confirmationHtml,
  notifyHtml,
  notifyTo,
  sendEmail,
} from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Corps de requête invalide." },
      { status: 400 }
    );
  }
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Veuillez remplir les champs requis correctement." },
      { status: 400 }
    );
  }
  const d = parsed.data;
  if (d.website && d.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const bullets = [
    { label: "Nom", value: d.name },
    { label: "Courriel", value: d.email },
    { label: "Sujet", value: d.subject },
    { label: "Message", value: d.message },
  ];

  try {
    await sendEmail({
      to: d.email,
      subject: "Confirmation : votre message a été reçu",
      html: confirmationHtml({
        name: d.name,
        intro:
          "Merci pour votre message. J'ai bien reçu votre demande et je vous répondrai dès que possible.",
        bullets: [
          { label: "Sujet", value: d.subject },
          { label: "Votre message", value: d.message },
        ],
      }),
    });
    await sendEmail({
      to: notifyTo,
      subject: `Nouveau message — ${d.subject}`,
      html: notifyHtml({ title: "Nouveau message via le formulaire de contact", bullets }),
      replyTo: d.email,
    });
  } catch (err) {
    console.error("[/api/contact] envoi échoué", err);
    return NextResponse.json(
      {
        message:
          "Message reçu mais l'envoi du courriel de confirmation a échoué. Je vous reviens rapidement.",
      },
      { status: 202 }
    );
  }

  return NextResponse.json({ ok: true });
}
