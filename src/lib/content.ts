import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ProjectContent = {
  link: string | undefined;
  slug: string;
  title: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  linkColor: string;
  description: string;
  cta: string;
  chips: string[];
  defi: string;
  solution: string;
  resultat: string;
  tech: string[];
  logo: string;
  images: string[];
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function parseProject(filePath: string): ProjectContent {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  return {
    slug: data.slug ?? "",
    title: data.title ?? "",
    tag: data.tag ?? "",
    tagBg: data.tagBg ?? "",
    tagColor: data.tagColor ?? "",
    link: data.link ?? "",
    linkColor: data.linkColor ?? "",
    description: data.description ?? "",
    cta: data.cta ?? "Voir l'étude de cas",
    chips: Array.isArray(data.chips) ? data.chips : [],
    defi: data.defi ?? "",
    solution: data.solution ?? "",
    resultat: data.resultat ?? "",
    tech: Array.isArray(data.tech) ? data.tech : [],
    logo: data.logo ?? "",
    images: Array.isArray(data.images) ? data.images : [],
  };
}

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getProject(slug: string): ProjectContent | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseProject(filePath);
}

export function getAllProjects(): ProjectContent[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parseProject(path.join(PROJECTS_DIR, f)));
}
