import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validation";
import { confirmationHtml, notifyHtml, notifyTo, sendEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
	let json: unknown;
	try {
		json = await req.json();
	} catch {
		return NextResponse.json(
			{ message: "Corps de requête invalide." },
			{ status: 400 },
		);
	}
	const parsed = quoteSchema.safeParse(json);
	if (!parsed.success) {
		return NextResponse.json(
			{ message: "Veuillez remplir les champs requis correctement." },
			{ status: 400 },
		);
	}
	const d = parsed.data;
	if (d.website && d.website.length > 0) {
		return NextResponse.json({ ok: true });
	}

	const bullets = [
		{ label: "Nom", value: d.name },
		{ label: "Courriel", value: d.email },
		{ label: "Entreprise", value: d.company || "—" },
		{ label: "Téléphone", value: d.phone || "—" },
		{ label: "Besoin", value: d.need },
		{ label: "Échéancier", value: d.timeline },
		{ label: "Budget", value: d.budget || "—" },
		{ label: "Description", value: d.message },
	];

	try {
		await sendEmail({
			to: d.email,
			subject: "Confirmation : votre demande de soumission",
			html: confirmationHtml({
				name: d.name,
				intro:
					"Merci pour votre demande de soumission, je vais prendre un moment d'examiner votre requête et je vous recontacte sous 24-48 h ouvrables.",
			}),
		});
		await sendEmail({
			to: notifyTo,
			subject: `Nouvelle soumission — ${d.name} (${d.need})`,
			html: notifyHtml({ title: "Nouvelle demande de soumission", bullets }),
			replyTo: d.email,
		});
	} catch (err) {
		console.error("[/api/quote] envoi échoué", err);
		return NextResponse.json(
			{
				message:
					"Votre demande a été reçue mais l'envoi du courriel de confirmation a échoué. Je vous reviens sous peu.",
			},
			{ status: 202 },
		);
	}

	return NextResponse.json({ ok: true });
}
