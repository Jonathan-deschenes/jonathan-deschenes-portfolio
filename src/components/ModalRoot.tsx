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
  const [open, setOpen] = useState<ModalName | null>(null);

  // Sync with URL on mount + back/forward navigation
  useEffect(() => {
    setOpen(readModalFromUrl());
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
        title="Réserver une rencontre gratuite"
        size="xl"
      >
        <div className="min-h-[640px]">
          <CalEmbed url={site.bookingUrl} namespace="modal" />
        </div>
      </Modal>

      <Modal
        open={open === "quote"}
        onClose={close}
        title="Demander une soumission"
        size="md"
      >
        <p className="text-muted text-[15px] leading-[1.6] mb-[18px]">
          Décrivez votre projet en quelques lignes. Je vous reviens par
          courriel avec une première idée ou une estimation.
        </p>
        <SubmissionForm />
      </Modal>

      <Modal
        open={open === "contact"}
        onClose={close}
        title="Nous écrire"
        size="md"
      >
        <p className="text-muted text-[15px] leading-[1.6] mb-[18px]">
          Question, partenariat ou demande générale ? Écrivez-moi ici.
        </p>
        <ContactForm />
      </Modal>
    </>
  );
}
