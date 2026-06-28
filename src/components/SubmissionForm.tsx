"use client";

import { useState } from "react";
import { ArrowRight } from "./Icons";

type StepKey = "contact" | "project" | "details";
type FieldName =
  | "name"
  | "email"
  | "company"
  | "phone"
  | "need"
  | "timeline"
  | "budget"
  | "message";

const STEPS: { key: StepKey; title: string; subtitle: string }[] = [
  {
    key: "contact",
    title: "Vos coordonnées",
    subtitle: "On commence par l'essentiel.",
  },
  {
    key: "project",
    title: "Votre projet",
    subtitle: "Pour mieux préparer notre échange.",
  },
  {
    key: "details",
    title: "Quelques détails",
    subtitle: "Pour vous revenir avec une réponse pertinente.",
  },
];

const REQUIRED_PER_STEP: Record<StepKey, FieldName[]> = {
  contact: ["name", "email"],
  project: ["need", "timeline"],
  details: ["message"],
};

type FormState = {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
};

type FormValues = Record<FieldName, string>;

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  need: "",
  timeline: "",
  budget: "",
  message: "",
};

export default function SubmissionForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {}
  );
  const [state, setState] = useState<FormState>({ status: "idle" });
  const totalSteps = STEPS.length;
  const step = STEPS[stepIndex];

  function setValue<K extends FieldName>(name: K, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function emailValid(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function getStepErrors(idx: number): Partial<Record<FieldName, string>> {
    const errors: Partial<Record<FieldName, string>> = {};
    const required = REQUIRED_PER_STEP[STEPS[idx].key];
    for (const f of required) {
      if (!values[f]?.trim()) errors[f] = "Ce champ est requis.";
    }
    if (required.includes("email") && values.email && !emailValid(values.email))
      errors.email = "Adresse courriel invalide.";
    if (
      required.includes("message") &&
      values.message &&
      values.message.trim().length < 10
    )
      errors.message = "Au moins 10 caractères.";
    return errors;
  }

  const currentErrors = getStepErrors(stepIndex);
  const canAdvance = Object.keys(currentErrors).length === 0;

  function markStepTouched() {
    const next: Partial<Record<FieldName, boolean>> = { ...touched };
    for (const f of REQUIRED_PER_STEP[step.key]) next[f] = true;
    setTouched(next);
  }

  function goNext() {
    if (!canAdvance) {
      markStepTouched();
      return;
    }
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canAdvance) {
      markStepTouched();
      return;
    }
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.message || "Une erreur est survenue.");
      setState({
        status: "success",
        message:
          "Merci ! Votre demande a été envoyée. Vous recevrez une confirmation par courriel sous peu.",
      });
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

  const isLastStep = stepIndex === totalSteps - 1;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <Stepper current={stepIndex} total={totalSteps} steps={STEPS} />

      <div>
        <h3 className="font-semibold text-[18px] tracking-[-.01em]">
          {step.title}
        </h3>
        <p className="text-[14px] text-muted mt-1">{step.subtitle}</p>
      </div>

      <div className="grid gap-[18px]">
        {step.key === "contact" && (
          <>
            <Field
              label="Nom complet"
              name="name"
              value={values.name}
              onChange={(v) => setValue("name", v)}
              error={touched.name ? currentErrors.name : undefined}
              required
              autoFocus
            />
            <Field
              label="Courriel"
              name="email"
              type="email"
              value={values.email}
              onChange={(v) => setValue("email", v)}
              error={touched.email ? currentErrors.email : undefined}
              required
            />
            <Field
              label="Entreprise / cabinet"
              name="company"
              value={values.company}
              onChange={(v) => setValue("company", v)}
            />
            <Field
              label="Téléphone (facultatif)"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={(v) => setValue("phone", v)}
            />
          </>
        )}

        {step.key === "project" && (
          <>
            <Select
              label="Type de besoin"
              name="need"
              value={values.need}
              onChange={(v) => setValue("need", v)}
              error={touched.need ? currentErrors.need : undefined}
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
              value={values.timeline}
              onChange={(v) => setValue("timeline", v)}
              error={touched.timeline ? currentErrors.timeline : undefined}
              required
              options={[
                "Dès que possible",
                "Dans 1 à 3 mois",
                "J'explore pour l'instant",
              ]}
            />
          </>
        )}

        {step.key === "details" && (
          <>
            <Select
              label="Budget approximatif (facultatif)"
              name="budget"
              value={values.budget}
              onChange={(v) => setValue("budget", v)}
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
              value={values.message}
              onChange={(v) => setValue("message", v)}
              error={touched.message ? currentErrors.message : undefined}
              required
            />
          </>
        )}
      </div>

      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={values.name === "honeypot-noop" ? "" : ""}
        onChange={() => {}}
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

      {isLastStep && (
        <p className="text-[13px] text-muted-soft leading-[1.5]">
          En soumettant ce formulaire, vous consentez à ce que vos informations
          soient utilisées uniquement pour répondre à votre demande,
          conformément à notre{" "}
          <a href="/confidentialite" className="text-brand underline">
            politique de confidentialité
          </a>{" "}
          et à la Loi 25 du Québec.
        </p>
      )}

      {state.status === "error" && (
        <div
          role="alert"
          className="bg-[#fff0f0] text-[#a40000] border border-[#f5c0c0] p-3 rounded-[10px] text-[14px]"
        >
          {state.message}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-2 border-t border-border mt-2">
        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="text-[14px] font-semibold text-ink-soft px-3 py-2 rounded-lg hover:bg-cream transition-colors"
          >
            ← Précédent
          </button>
        ) : (
          <span />
        )}

        {isLastStep ? (
          <button
            type="submit"
            className="btn-primary"
            disabled={state.status === "submitting" || !canAdvance}
          >
            {state.status === "submitting"
              ? "Envoi en cours…"
              : "Envoyer ma demande"}
            <ArrowRight />
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="btn-primary"
            disabled={!canAdvance}
          >
            Suivant <ArrowRight />
          </button>
        )}
      </div>
    </form>
  );
}

function Stepper({
  current,
  total,
  steps,
}: {
  current: number;
  total: number;
  steps: { key: StepKey; title: string }[];
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <div key={s.key} className="flex items-center gap-1.5 sm:gap-2 flex-1">
              <div
                className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[11px] sm:text-[12px] font-bold flex-none transition-colors ${
                  done
                    ? "bg-brand text-white"
                    : active
                    ? "bg-brand text-white ring-4 ring-[rgba(26,96,245,.15)]"
                    : "bg-cream text-muted-soft"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {done ? "✓" : i + 1}
              </div>
              {i < total - 1 && (
                <div
                  className={`flex-1 h-[2px] rounded-full transition-colors ${
                    i < current ? "bg-brand" : "bg-cream"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="text-[12px] text-muted-soft font-medium">
        Étape {current + 1} sur {total} · {steps[current].title}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  required,
  autoFocus,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        aria-invalid={!!error}
        className={`input-base ${error ? "border-[#f5c0c0] bg-[#fff8f8]" : ""}`}
      />
      {error && (
        <span className="text-[13px] text-[#a40000]">{error}</span>
      )}
    </label>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[14px] font-semibold text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`input-base ${error ? "border-[#f5c0c0] bg-[#fff8f8]" : ""}`}
      >
        <option value="" disabled>
          Choisir…
        </option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {error && (
        <span className="text-[13px] text-[#a40000]">{error}</span>
      )}
    </label>
  );
}

function Textarea({
  label,
  name,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        aria-invalid={!!error}
        className={`input-base resize-y ${error ? "border-[#f5c0c0] bg-[#fff8f8]" : ""}`}
      />
      {error && (
        <span className="text-[13px] text-[#a40000]">{error}</span>
      )}
    </label>
  );
}
