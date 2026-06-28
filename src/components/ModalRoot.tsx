"use client";

import { Suspense, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import CalEmbed from "./CalEmbed";
import SubmissionForm from "./SubmissionForm";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";

type ModalName = "booking" | "quote" | "contact";

const VALID: ModalName[] = ["booking", "quote", "contact"];

function ModalRootInner() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get("modal");
  const open = (VALID as string[]).includes(current ?? "")
    ? (current as ModalName)
    : null;

  const close = useCallback(() => {
    const next = new URLSearchParams(params.toString());
    next.delete("modal");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [params, pathname, router]);

  return (
    <>
      <Modal
        open={open === "booking"}
        onClose={close}
        title="Réserver une rencontre gratuite"
        size="xl"
      >
        <div style={{ minHeight: 640 }}>
          <CalEmbed url={site.bookingUrl} />
        </div>
      </Modal>

      <Modal
        open={open === "quote"}
        onClose={close}
        title="Demander une soumission"
        size="md"
      >
        <p
          style={{
            color: "#5b626e",
            fontSize: 15,
            lineHeight: 1.6,
            marginBottom: 18,
          }}
        >
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
        <p
          style={{
            color: "#5b626e",
            fontSize: 15,
            lineHeight: 1.6,
            marginBottom: 18,
          }}
        >
          Question, partenariat ou demande générale ? Écrivez-moi ici.
        </p>
        <ContactForm />
      </Modal>
    </>
  );
}

export default function ModalRoot() {
  return (
    <Suspense fallback={null}>
      <ModalRootInner />
    </Suspense>
  );
}
