import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import {
  confirmationHtml,
  notifyHtml,
  notifyTo,
  sendEmail,
} from "@/lib/email";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Fallback API route for booking data — used either by a manual booking form
// or as a webhook target from Cal.com (configure in Cal → Webhooks).
// IMPORTANT : si cette route est un jour branchée comme webhook Cal.com,
// vérifier la signature HMAC (en-tête `x-cal-signature-256`, secret configuré
// dans Cal → Webhooks) avant tout traitement, sinon n'importe qui peut forger
// des réservations.
export async function POST(req: Request) {
  if (!rateLimit("booking", req).ok) return rateLimitResponse();
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Corps de requête invalide." },
      { status: 400 }
    );
  }
  const parsed = bookingSchema.safeParse(json);
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
    { label: "Besoin", value: d.need },
    { label: "Échéancier", value: d.timeline },
    { label: "Objectif", value: d.goal },
  ];

  try {
    await sendEmail({
      to: d.email,
      subject: "Confirmation : votre rencontre est en cours de planification",
      html: confirmationHtml({
        name: d.name,
        intro:
          "Merci d'avoir réservé une rencontre. Vous recevrez l'invitation calendrier sous peu.",
      }),
    });
    await sendEmail({
      to: notifyTo,
      subject: `Nouvelle réservation — ${d.name} (${d.need})`,
      html: notifyHtml({ title: "Nouvelle réservation de rencontre", bullets }),
      replyTo: d.email,
    });
  } catch (err) {
    console.error("[/api/booking] envoi échoué", err);
    return NextResponse.json(
      {
        message:
          "Réservation reçue mais l'envoi du courriel de confirmation a échoué.",
      },
      { status: 202 }
    );
  }

  return NextResponse.json({ ok: true });
}
