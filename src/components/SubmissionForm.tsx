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
      <div
        style={{
          background: "#f0f7ff",
          border: "1px solid #cfe2ff",
          borderRadius: 14,
          padding: 24,
          color: "#0e1320",
        }}
      >
        <strong>Demande reçue.</strong>
        <p style={{ marginTop: 6, color: "#3a414d", lineHeight: 1.6 }}>
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 18 }}>
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
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          opacity: 0,
        }}
        aria-hidden
      />

      <p style={{ fontSize: 13, color: "#6a727f", lineHeight: 1.5 }}>
        En soumettant ce formulaire, vous consentez à ce que vos informations
        soient utilisées uniquement pour répondre à votre demande,
        conformément à notre{" "}
        <a
          href="/confidentialite"
          style={{ color: "#1a60f5", textDecoration: "underline" }}
        >
          politique de confidentialité
        </a>{" "}
        et à la Loi 25 du Québec.
      </p>

      {state.status === "error" && (
        <div
          role="alert"
          style={{
            background: "#fff0f0",
            color: "#a40000",
            border: "1px solid #f5c0c0",
            padding: 12,
            borderRadius: 10,
            fontSize: 14,
          }}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        className="btn-primary"
        disabled={state.status === "submitting"}
        style={{ justifyContent: "center" }}
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
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#0e1320" }}>
        {label}
        {required && <span style={{ color: "#1a60f5" }}> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        style={inputStyle}
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
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#0e1320" }}>
        {label}
        {required && <span style={{ color: "#1a60f5" }}> *</span>}
      </span>
      <select name={name} required={required} style={inputStyle} defaultValue="">
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
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#0e1320" }}>
        {label}
        {required && <span style={{ color: "#1a60f5" }}> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={5}
        style={{ ...inputStyle, fontFamily: "inherit", resize: "vertical" }}
      />
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  border: "1px solid #e2e3e6",
  borderRadius: 11,
  padding: "12px 14px",
  fontSize: 15,
  color: "#0e1320",
  background: "#fff",
  outline: "none",
  fontFamily: "inherit",
};
