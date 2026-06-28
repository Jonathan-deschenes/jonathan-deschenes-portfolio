const rawBookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  "https://cal.com/jonathan-deschenes/30min";

function toEmbedUrl(url: string) {
  if (url.includes("cal.com")) {
    const u = url.replace(/\/$/, "");
    return u.endsWith("/embed") ? u : `${u}/embed`;
  }
  return url;
}

export const site = {
  name: "Jonathan Deschênes",
  shortName: "JD",
  baseUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://jodeschenes.com",
  email: "info@jodeschenes.com",
  region: "Québec",
  bookingUrl: rawBookingUrl,
  bookingEmbedUrl: toEmbedUrl(rawBookingUrl),
  socials: {
    linkedin: "https://www.linkedin.com/in/jonathan-deschenes/",
    github: "https://github.com/",
  },
} as const;
