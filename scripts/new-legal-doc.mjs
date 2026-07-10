#!/usr/bin/env node
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LEGAL_DIR = path.join(ROOT, "content", "politics");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
const ask = (q) => new Promise((res) => rl.question(q, res));

function slugify(str) {
	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

function today() {
	return new Date().toISOString().slice(0, 10);
}

console.log("\nNouveau document légal — Jonathan Deschênes SPA\n");

const title = await ask("Titre du document (ex: Conditions d'utilisation) : ");
const defaultSlug = slugify(title);
const slugInput = await ask(`Slug URL (défaut: ${defaultSlug}) : `);
const slug = slugInput.trim() || defaultSlug;

const eyebrow = await ask(
	"Eyebrow (petit label au-dessus du titre, ex: CONDITIONS) : ",
);
const description = await ask("Description (méta / SEO) : ");
rl.close();

const frontmatter = `---
slug: ${slug}
title: "${title}"
description: "${description}"
eyebrow: "${eyebrow}"
updated: "${today()}"
---

## Section

Contenu à rédiger ici.
`;

const mdPath = path.join(LEGAL_DIR, `${slug}.md`);
if (fs.existsSync(mdPath)) {
	console.error(`\nLe fichier ${mdPath} existe déjà. Abandon.`);
	process.exit(1);
}
fs.mkdirSync(LEGAL_DIR, { recursive: true });
fs.writeFileSync(mdPath, frontmatter, "utf8");

console.log(`
Document créé avec succès !

  Fichier : content/politics/${slug}.md

Prochaines étapes :
  1. Rédigez le contenu dans content/politics/${slug}.md
  2. Créez une page pour l'exposer (src/app/${slug}/page.tsx), sur le modèle de
     src/app/confidentialite/page.tsx.
  3. À chaque mise à jour du contenu, publiez la nouvelle date :
     npm run legal:publish -- --slug ${slug}
`);
