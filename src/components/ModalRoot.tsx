"use client";

import { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import CalEmbed from "./CalEmbed";
import SubmissionForm from "./SubmissionForm";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";

type ModalName = "booking" | "quote" | "contact";

const VALID: ModalName[] = ["booking", "quote", "contact"];

function readModalFromUrl(): ModalName | null {
	if (typeof window === "undefined") return null;
	const v = new URLSearchParams(window.location.search).get("modal");
	return (VALID as string[]).includes(v ?? "") ? (v as ModalName) : null;
}

export default function ModalRoot() {
	const [open, setOpen] = useState<ModalName | null>(() => readModalFromUrl());

	// Sync with back/forward navigation
	useEffect(() => {
		const onPop = () => setOpen(readModalFromUrl());
		window.addEventListener("popstate", onPop);
		return () => window.removeEventListener("popstate", onPop);
	}, []);

	const close = useCallback(() => {
		if (typeof window === "undefined") return;
		const url = new URL(window.location.href);
		url.searchParams.delete("modal");
		window.history.replaceState(null, "", url);
		setOpen(null);
	}, []);

	return (
		<>
			<Modal
				open={open === "booking"}
				onClose={close}
				title='Réserver une rencontre gratuite'
				size='xl'
			>
				<section className='max-w-4xl'>
					<div className='max-w-full'>
						<div className='eyebrow mb-3 sm:mb-4'>
							RENCONTRE GRATUITE (30 MIN)
						</div>
						<h1 className='font-bold text-[22px] sm:text-[28px] md:text-[32px] leading-[1.15] sm:leading-[1.1] tracking-[-.02em] mb-3 sm:mb-[18px]'>
							Discutons de votre projet, sans engagement.
						</h1>
						<p className='text-[14px] sm:text-[15px] text-muted leading-[1.6] mb-5 sm:mb-7'>
							30 minutes pour cerner votre besoin, répondre à vos questions et
							voir si on peut travailler ensemble. Virtuel, partout au Québec.
						</p>
					</div>
				</section>
				<div className='min-h-[520px] sm:min-h-[640px]'>
					<CalEmbed url={site.bookingUrl} namespace='modal' />
				</div>
			</Modal>

			<Modal
				open={open === "quote"}
				onClose={close}
				title='Demander une soumission'
				size='md'
			>
				<p className='text-muted text-[15px] leading-[1.6] mb-[18px]'>
					Décrivez votre projet en quelques lignes. Je vous reviens par courriel
					avec une première idée ou une estimation.
				</p>
				<SubmissionForm />
			</Modal>

			<Modal
				open={open === "contact"}
				onClose={close}
				title='Nous écrire'
				size='md'
			>
				<p className='text-muted text-[15px] leading-[1.6] mb-[18px]'>
					Question, partenariat ou demande générale ? Écrivez-moi ici.
				</p>
				<ContactForm />
			</Modal>
		</>
	);
}
