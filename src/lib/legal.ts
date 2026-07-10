import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  updated: string;
  html: string;
};

const LEGAL_DIR = path.join(process.cwd(), "content", "politics");

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const renderer = new marked.Renderer();
renderer.heading = ({ depth, text }) => {
  const slug = slugifyHeading(text);
  return `<h${depth} id="${slug}">${marked.parseInline(text) as string}</h${depth}>\n`;
};

function formatDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === "string" ? value : "";
}

function parseLegalDoc(filePath: string): LegalDoc {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug: data.slug ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    eyebrow: data.eyebrow ?? "",
    updated: formatDate(data.updated),
    html: marked.parse(content, { renderer }) as string,
  };
}

export function getLegalSlugs(): string[] {
  return fs
    .readdirSync(LEGAL_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getLegalDoc(slug: string): LegalDoc | null {
  const filePath = path.join(LEGAL_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parseLegalDoc(filePath);
}

export function getAllLegalDocs(): LegalDoc[] {
  return fs
    .readdirSync(LEGAL_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseLegalDoc(path.join(LEGAL_DIR, f)));
}
