"use client";

import { useState } from "react";
import { ArrowRight } from "./Icons";

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
};

export default function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.message || "Une erreur est survenue.");
      setState({
        status: "success",
        message:
          "Merci ! Votre message a été envoyé. Vous recevrez une confirmation par courriel.",
      });
      form.reset();
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Une erreur est survenue.",
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
        <strong>Message envoyé.</strong>
        <p style={{ marginTop: 6, color: "#3a414d", lineHeight: 1.6 }}>
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 18 }}>
      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>
          Nom <span style={{ color: "#1a60f5" }}>*</span>
        </span>
        <input name="name" required style={inputStyle} />
      </label>
      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>
          Courriel <span style={{ color: "#1a60f5" }}>*</span>
        </span>
        <input name="email" type="email" required style={inputStyle} />
      </label>
      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>
          Sujet <span style={{ color: "#1a60f5" }}>*</span>
        </span>
        <input name="subject" required style={inputStyle} />
      </label>
      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>
          Message <span style={{ color: "#1a60f5" }}>*</span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          style={{ ...inputStyle, fontFamily: "inherit", resize: "vertical" }}
        />
      </label>

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          opacity: 0,
        }}
      />

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
        {state.status === "submitting" ? "Envoi en cours…" : "Envoyer"}
        <ArrowRight />
      </button>
    </form>
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
