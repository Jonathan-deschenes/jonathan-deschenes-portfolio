"use client";

import { useState } from "react";
import { ArrowRight } from "./Icons";

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
};

export default function SubmissionForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.message || "Une erreur est survenue.");
      setState({
        status: "success",
        message:
          "Merci ! Votre demande a été envoyée. Vous recevrez une confirmation par courriel sous peu.",
      });
      form.reset();
    } catch (err) {
      setState({
        status: "error",
        message:
          err instanceof Error ? err.message : "Une erreur est survenue.",
      });
    }
  }

  if (state.status === "success") {
    return (
      <div className="bg-[#f0f7ff] border border-[#cfe2ff] rounded-[14px] p-6 text-ink">
        <strong>Demande reçue.</strong>
        <p className="mt-1.5 text-ink-soft leading-relaxed">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-[18px]">
      <Field label="Nom complet" name="name" required />
      <Field label="Courriel" name="email" type="email" required />
      <Field label="Entreprise / cabinet" name="company" />
      <Field label="Téléphone (facultatif)" name="phone" type="tel" />
      <Select
        label="Type de besoin"
        name="need"
        required
        options={[
          "Site web",
          "Automatisation",
          "Intégration IA",
          "Application sur mesure",
          "Je ne suis pas certain",
        ]}
      />
      <Select
        label="Échéancier"
        name="timeline"
        required
        options={["Dès que possible", "Dans 1 à 3 mois", "J'explore pour l'instant"]}
      />
      <Select
        label="Budget approximatif (facultatif)"
        name="budget"
        options={[
          "Moins de 2 500 $",
          "2 500 $ à 7 500 $",
          "7 500 $ à 15 000 $",
          "Plus de 15 000 $",
          "Je préfère en discuter",
        ]}
      />
      <Textarea
        label="Décrivez votre projet ou le problème à régler"
        name="message"
        required
      />

      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

      <p className="text-[13px] text-muted-soft leading-[1.5]">
        En soumettant ce formulaire, vous consentez à ce que vos informations
        soient utilisées uniquement pour répondre à votre demande,
        conformément à notre{" "}
        <a href="/confidentialite" className="text-brand underline">
          politique de confidentialité
        </a>{" "}
        et à la Loi 25 du Québec.
      </p>

      {state.status === "error" && (
        <div
          role="alert"
          className="bg-[#fff0f0] text-[#a40000] border border-[#f5c0c0] p-3 rounded-[10px] text-[14px]"
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        className="btn-primary justify-center"
        disabled={state.status === "submitting"}
      >
        {state.status === "submitting" ? "Envoi en cours…" : "Envoyer ma demande"}
        <ArrowRight />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[14px] font-semibold text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="input-base"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[14px] font-semibold text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      <select name={name} required={required} className="input-base" defaultValue="">
        <option value="" disabled>
          Choisir…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Textarea({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[14px] font-semibold text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={5}
        className="input-base resize-y"
      />
    </label>
  );
}
