#!/usr/bin/env node
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

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

console.log("\n[INFO] Nouveau projet \n");

const title = await ask("[WARN] Titre du projet : ");
const slug = slugify(title);

// Build frontmatter
const frontmatter = `---
slug: ${slug}
title: "${title}"
link: "Lien pour visiter le projet."
description: "Courte description pour l'aperçu du projet."
chips: "["", "", ""]"
defi: ""
solution: ""
resultat: ""
tech: "["", "", ""]"
logo: "/projects/${slug}/logo.avif"
images:
  - "/projects/${slug}/desktop.png"
---
`;

// Write MDX file
const mdxPath = path.join(ROOT, "content", "projects", `${slug}.mdx`);
if (fs.existsSync(mdxPath)) {
	console.error(`\n[ERROR] Le fichier ${mdxPath} existe déjà, fermeture...`);
	process.exit(1);
}
fs.writeFileSync(mdxPath, frontmatter, "utf8");

// Create image folder
const imgDir = path.join(ROOT, "public", "projects", slug);
fs.mkdirSync(imgDir, { recursive: true });
fs.writeFileSync(
	path.join(imgDir, "IMAGES_ICI.txt"),
	`Placez vos images dans ce dossier :\n  logo.avif  — logo affiché sur la carte d'accueil\n  desktop.png — capture plein écran affichée sur la page de cas d'étude\n\nAprès avoir ajouté les images, lancez :\n  npm run project:compress -- --slug ${slug}\n`,
	"utf8",
);

console.log(`
[INFO] fichier projet créé avec succès !

[INFO] Fichier MDX  : content/projects/${slug}.mdx
[INFO] Dossier imgs : public/projects/${slug}/

[WARN] Créer le contenu dans le fichier content/projects/${slug}.mdx
[WARN] Ajoutez vos images dans public/projects/${slug}/
[WARN] Compressez le projet en WebP : npm run project:compress -- --slug ${slug}
[WARN] Supprimer au besoin le projet : npm run project:delete -- --slug ${slug}
`);

rl.close();
