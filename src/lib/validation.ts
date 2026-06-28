import { z } from "zod";

const honeypot = z
  .string()
  .max(0, "Spam détecté.")
  .optional()
  .or(z.literal(""));

export const quoteSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().max(160).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  need: z.string().min(1).max(80),
  timeline: z.string().min(1).max(80),
  budget: z.string().max(80).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
  website: honeypot,
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(5).max(4000),
  website: honeypot,
});

export const bookingSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  need: z.string().min(1).max(80),
  timeline: z.string().min(1).max(80),
  goal: z.string().min(5).max(1000),
  website: honeypot,
});

export type QuoteData = z.infer<typeof quoteSchema>;
export type ContactData = z.infer<typeof contactSchema>;
export type BookingData = z.infer<typeof bookingSchema>;
