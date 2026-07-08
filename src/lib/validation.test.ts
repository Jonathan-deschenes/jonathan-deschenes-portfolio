import { describe, it, expect } from "vitest";
import { quoteSchema, contactSchema, bookingSchema } from "./validation";

const s = (n: number) => "a".repeat(n);

function expectValid(result: { success: boolean }) {
  expect(result.success).toBe(true);
}
function expectInvalid(result: { success: boolean }) {
  expect(result.success).toBe(false);
}

describe("quoteSchema", () => {
  const base = {
    name: "Jane Doe",
    email: "jane@example.com",
    need: "Site web",
    timeline: "Dès que possible",
    message: "Décrivez votre projet ici svp",
  };

  it("accepts a minimal valid payload", () => {
    expectValid(quoteSchema.safeParse(base));
  });

  it("rejects when a required field is missing", () => {
    const rest: Record<string, unknown> = { ...base };
    delete rest.name;
    expectInvalid(quoteSchema.safeParse(rest));
  });

  it("rejects an invalid email", () => {
    expectInvalid(quoteSchema.safeParse({ ...base, email: "not-an-email" }));
  });

  it("accepts optional company/phone/budget as omitted or empty string", () => {
    expectValid(quoteSchema.safeParse(base));
    expectValid(
      quoteSchema.safeParse({ ...base, company: "", phone: "", budget: "" })
    );
    expectValid(
      quoteSchema.safeParse({ ...base, company: "Acme", phone: "5141234567", budget: "1000$" })
    );
  });

  it("enforces name length bounds (2-120)", () => {
    expectInvalid(quoteSchema.safeParse({ ...base, name: s(1) }));
    expectValid(quoteSchema.safeParse({ ...base, name: s(2) }));
    expectValid(quoteSchema.safeParse({ ...base, name: s(120) }));
    expectInvalid(quoteSchema.safeParse({ ...base, name: s(121) }));
  });

  it("enforces message length bounds (10-4000)", () => {
    expectInvalid(quoteSchema.safeParse({ ...base, message: s(9) }));
    expectValid(quoteSchema.safeParse({ ...base, message: s(10) }));
    expectValid(quoteSchema.safeParse({ ...base, message: s(4000) }));
    expectInvalid(quoteSchema.safeParse({ ...base, message: s(4001) }));
  });

  it("enforces need/timeline length bounds (1-80)", () => {
    expectInvalid(quoteSchema.safeParse({ ...base, need: s(0) }));
    expectValid(quoteSchema.safeParse({ ...base, need: s(1) }));
    expectValid(quoteSchema.safeParse({ ...base, need: s(80) }));
    expectInvalid(quoteSchema.safeParse({ ...base, need: s(81) }));
  });

  it("enforces optional field max lengths (company 160, phone 40, budget 80)", () => {
    expectValid(quoteSchema.safeParse({ ...base, company: s(160) }));
    expectInvalid(quoteSchema.safeParse({ ...base, company: s(161) }));
    expectValid(quoteSchema.safeParse({ ...base, phone: s(40) }));
    expectInvalid(quoteSchema.safeParse({ ...base, phone: s(41) }));
    expectValid(quoteSchema.safeParse({ ...base, budget: s(80) }));
    expectInvalid(quoteSchema.safeParse({ ...base, budget: s(81) }));
  });

  it("honeypot: empty, omitted, and now (post-fix) filled values all pass Zod", () => {
    expectValid(quoteSchema.safeParse({ ...base, website: "" }));
    expectValid(quoteSchema.safeParse(base));
    expectValid(quoteSchema.safeParse({ ...base, website: "http://spam.example" }));
  });
});

describe("contactSchema", () => {
  const base = {
    name: "Jane Doe",
    email: "jane@example.com",
    subject: "Question",
    message: "Bonjour, j'ai une question",
  };

  it("accepts a minimal valid payload", () => {
    expectValid(contactSchema.safeParse(base));
  });

  it("rejects when a required field is missing", () => {
    const rest: Record<string, unknown> = { ...base };
    delete rest.subject;
    expectInvalid(contactSchema.safeParse(rest));
  });

  it("rejects an invalid email", () => {
    expectInvalid(contactSchema.safeParse({ ...base, email: "nope" }));
  });

  it("enforces subject length bounds (2-200)", () => {
    expectInvalid(contactSchema.safeParse({ ...base, subject: s(1) }));
    expectValid(contactSchema.safeParse({ ...base, subject: s(2) }));
    expectValid(contactSchema.safeParse({ ...base, subject: s(200) }));
    expectInvalid(contactSchema.safeParse({ ...base, subject: s(201) }));
  });

  it("enforces message length bounds (5-4000)", () => {
    expectInvalid(contactSchema.safeParse({ ...base, message: s(4) }));
    expectValid(contactSchema.safeParse({ ...base, message: s(5) }));
    expectValid(contactSchema.safeParse({ ...base, message: s(4000) }));
    expectInvalid(contactSchema.safeParse({ ...base, message: s(4001) }));
  });

  it("honeypot: empty, omitted, and now (post-fix) filled values all pass Zod", () => {
    expectValid(contactSchema.safeParse({ ...base, website: "" }));
    expectValid(contactSchema.safeParse(base));
    expectValid(contactSchema.safeParse({ ...base, website: "http://spam.example" }));
  });
});

describe("bookingSchema", () => {
  const base = {
    name: "Jane Doe",
    email: "jane@example.com",
    need: "Automatisation",
    timeline: "Dans 1 à 3 mois",
    goal: "Réduire le temps de collecte de documents",
  };

  it("accepts a minimal valid payload", () => {
    expectValid(bookingSchema.safeParse(base));
  });

  it("rejects when a required field is missing", () => {
    const rest: Record<string, unknown> = { ...base };
    delete rest.goal;
    expectInvalid(bookingSchema.safeParse(rest));
  });

  it("rejects an invalid email", () => {
    expectInvalid(bookingSchema.safeParse({ ...base, email: "nope" }));
  });

  it("enforces goal length bounds (5-1000)", () => {
    expectInvalid(bookingSchema.safeParse({ ...base, goal: s(4) }));
    expectValid(bookingSchema.safeParse({ ...base, goal: s(5) }));
    expectValid(bookingSchema.safeParse({ ...base, goal: s(1000) }));
    expectInvalid(bookingSchema.safeParse({ ...base, goal: s(1001) }));
  });

  it("enforces need/timeline length bounds (1-80)", () => {
    expectInvalid(bookingSchema.safeParse({ ...base, timeline: s(0) }));
    expectValid(bookingSchema.safeParse({ ...base, timeline: s(1) }));
    expectValid(bookingSchema.safeParse({ ...base, timeline: s(80) }));
    expectInvalid(bookingSchema.safeParse({ ...base, timeline: s(81) }));
  });

  it("honeypot: empty, omitted, and now (post-fix) filled values all pass Zod", () => {
    expectValid(bookingSchema.safeParse({ ...base, website: "" }));
    expectValid(bookingSchema.safeParse(base));
    expectValid(bookingSchema.safeParse({ ...base, website: "http://spam.example" }));
  });
});
