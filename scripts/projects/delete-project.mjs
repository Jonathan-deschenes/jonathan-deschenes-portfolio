#!/usr/bin/env node
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const PROJECTS_DIR = path.join(ROOT, "public", "projects");
const CONTENT_DIR = path.join(ROOT, "content", "projects");

// Parse args
const args = process.argv.slice(2);
const slugIdx = args.indexOf("--slug");
const allFlag = args.includes("--all");

if (!allFlag && slugIdx === -1) {
	console.error(
		"[INFO] Usage:\n  npm run project:delete -- --slug <nom>\n  npm run project:delete -- --all",
	);
	process.exit(1);
}

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

function deleteSlug(slug) {
	const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
	const imgDir = path.join(PROJECTS_DIR, slug);

	if (fs.existsSync(mdxPath)) {
		fs.rmSync(mdxPath);
		console.log(`[INFO] Fichier supprimé : content/projects/${slug}.mdx`);
	} else {
		console.warn(`[WARN] Fichier introuvable : content/projects/${slug}.mdx`);
	}

	if (fs.existsSync(imgDir)) {
		fs.rmSync(imgDir, { recursive: true, force: true });
		console.log(`[INFO] Dossier supprimé : public/projects/${slug}/`);
	} else {
		console.warn(`[WARN] Dossier introuvable : public/projects/${slug}/`);
	}
}

if (allFlag) {
	const slugs = new Set();

	if (fs.existsSync(CONTENT_DIR)) {
		for (const f of fs.readdirSync(CONTENT_DIR)) {
			if (f.endsWith(".mdx")) slugs.add(path.basename(f, ".mdx"));
		}
	}
	if (fs.existsSync(PROJECTS_DIR)) {
		for (const f of fs.readdirSync(PROJECTS_DIR)) {
			if (fs.statSync(path.join(PROJECTS_DIR, f)).isDirectory()) slugs.add(f);
		}
	}

	if (slugs.size === 0) {
		console.log("[INFO] Aucun projet à supprimer.");
		rl.close();
		process.exit(0);
	}

	console.log(`\n[WARN] Cette action va supprimer ${slugs.size} projet(s) :`);
	for (const s of slugs) console.log(`  - ${s}`);

	const confirm = await ask("\n[INFO] Tapez y/n pour confirmer ou annuler : ");

	if (confirm.trim().toLowerCase() !== "y") {
		console.log("[INFO] Suppression annulée.");
		rl.close();
		process.exit(0);
	}

	for (const s of slugs) {
		console.log(`\n[INFO] Suppression de ${s}...`);
		deleteSlug(s);
	}

	console.log("\n[DONE] Tous les projets ont été supprimés.");
	rl.close();
	process.exit(0);
}

// Single slug deletion
const rawSlug = args[slugIdx + 1];
if (!rawSlug) {
	console.error("[ERROR] Fournissez un slug après --slug");
	rl.close();
	process.exit(1);
}
const slug = slugify(rawSlug);

const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
const imgDir = path.join(PROJECTS_DIR, slug);

if (!fs.existsSync(mdxPath) && !fs.existsSync(imgDir)) {
	console.error(`[ERROR] Aucun projet trouvé pour le slug "${slug}".`);
	rl.close();
	process.exit(1);
}

console.log(`\n[WARN] Cette action va supprimer définitivement :`);
if (fs.existsSync(mdxPath)) console.log(`  - content/projects/${slug}.mdx`);
if (fs.existsSync(imgDir)) console.log(`  - public/projects/${slug}/`);

const confirm = await ask(
	`\n[INFO] Tapez le slug "${slug}" pour confirmer la suppression : `,
);
if (confirm.trim() !== slug) {
	console.log("[INFO] Suppression annulée.");
	rl.close();
	process.exit(0);
}

deleteSlug(slug);

console.log(`\n[DONE] Projet "${slug}" supprimé avec succès.`);
rl.close();
