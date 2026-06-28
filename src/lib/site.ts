export const site = {
  name: "Jonathan Deschênes",
  shortName: "JD",
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://jodeschenes.com",
  email: "info@jodeschenes.com",
  region: "Québec",
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com/jodeschenes/rencontre-30min",
  socials: {
    linkedin: "https://www.linkedin.com/in/jonathan-deschenes/",
    github: "https://github.com/",
  },
} as const;
