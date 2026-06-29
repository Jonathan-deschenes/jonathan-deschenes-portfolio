#!/usr/bin/env node
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

console.log("\n🗂  Nouveau projet — Jonathan Deschênes SPA\n");

const title = await ask("Titre du projet : ");
const defaultSlug = slugify(title);
const slugInput = await ask(`Slug URL (défaut: ${defaultSlug}) : `);
const slug = slugInput.trim() || defaultSlug;

const tag = await ask("Tag (ex: SITE VITRINE, APPLICATION WEB, AUTOMATISATION, INTÉGRATION IA) : ");
const mainColor = await ask("Couleur principale hex (ex: #3b46e0) : ");
const tagColor = mainColor.trim();
const tagBg = hexToRgba(tagColor, 0.12);
const linkRaw = await ask("Lien du site (ex: monsite.com, laisser vide si aucun) : ");
const link = linkRaw.trim()
  ? linkRaw.trim().startsWith("http") ? linkRaw.trim() : `https://${linkRaw.trim()}`
  : "";
const linkColor = tagColor;
const description = await ask("Description courte (carte d'accueil) : ");
const chipsInput = await ask("Chips/étiquettes (virgule séparées, ex: Site vitrine,OBNL,Mobile) : ");
const chips = chipsInput.split(",").map((c) => c.trim()).filter(Boolean);

console.log("\n--- Contenu de l'étude de cas ---");
const defi = await ask("Le défi : ");
const solution = await ask("La solution : ");
const resultat = await ask("Le résultat : ");
const techInput = await ask("Technologies (virgule séparées, ex: Next.js,TypeScript) : ");
const tech = techInput.split(",").map((t) => t.trim()).filter(Boolean);
rl.close();

// Build frontmatter
const frontmatter = `---
slug: ${slug}
title: "${title}"
tag: "${tag}"
tagBg: "${tagBg}"
tagColor: "${tagColor}"
link: "${link}"
linkColor: "${linkColor}"
description: "${description}"
cta: "Voir l'étude de cas"
chips: [${chips.map((c) => `"${c}"`).join(", ")}]
defi: "${defi}"
solution: "${solution}"
resultat: "${resultat}"
tech: [${tech.map((t) => `"${t}"`).join(", ")}]
logo: "/projects/${slug}/logo.avif"
images:
  - "/projects/${slug}/desktop.png"
---
`;

// Write MDX file
const mdxPath = path.join(ROOT, "content", "projects", `${slug}.mdx`);
if (fs.existsSync(mdxPath)) {
  console.error(`\n❌  Le fichier ${mdxPath} existe déjà. Abandon.`);
  process.exit(1);
}
fs.writeFileSync(mdxPath, frontmatter, "utf8");

// Create image folder
const imgDir = path.join(ROOT, "public", "projects", slug);
fs.mkdirSync(imgDir, { recursive: true });
fs.writeFileSync(
  path.join(imgDir, "IMAGES_ICI.txt"),
  `Placez vos images dans ce dossier :\n  logo.avif  — logo affiché sur la carte d'accueil\n  desktop.png — capture plein écran affichée sur la page de cas d'étude\n\nAprès avoir ajouté les images, lancez :\n  npm run project:compress -- --slug ${slug}\n`,
  "utf8"
);

console.log(`
Projet créé avec succès !

  Fichier MDX  : content/projects/${slug}.mdx
  Dossier imgs : public/projects/${slug}/

Prochaines étapes :
  1. Ajoutez vos images dans public/projects/${slug}/
     • logo.png    (logo pour la carte d'accueil)
     • desktop.png  (capture pour la page étude de cas)
  2. Compressez-les en WebP :
     npm run project:compress -- --slug ${slug}
  3. Lancez le serveur pour vérifier :
     npm run dev
`);
