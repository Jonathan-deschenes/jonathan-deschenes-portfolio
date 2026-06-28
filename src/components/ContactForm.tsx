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
      <div className="bg-[#f0f7ff] border border-[#cfe2ff] rounded-[14px] p-6 text-ink">
        <strong>Message envoyé.</strong>
        <p className="mt-1.5 text-ink-soft leading-relaxed">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-[18px]">
      <label className="grid gap-2">
        <span className="text-[14px] font-semibold">
          Nom <span className="text-brand">*</span>
        </span>
        <input name="name" required className="input-base" />
      </label>
      <label className="grid gap-2">
        <span className="text-[14px] font-semibold">
          Courriel <span className="text-brand">*</span>
        </span>
        <input name="email" type="email" required className="input-base" />
      </label>
      <label className="grid gap-2">
        <span className="text-[14px] font-semibold">
          Sujet <span className="text-brand">*</span>
        </span>
        <input name="subject" required className="input-base" />
      </label>
      <label className="grid gap-2">
        <span className="text-[14px] font-semibold">
          Message <span className="text-brand">*</span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="input-base resize-y"
        />
      </label>

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

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
        {state.status === "submitting" ? "Envoi en cours…" : "Envoyer"}
        <ArrowRight />
      </button>
    </form>
  );
}
