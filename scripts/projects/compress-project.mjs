#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const PROJECTS_DIR = path.join(ROOT, "public", "projects");

const SUPPORTED = new Set([".png", ".jpg", ".jpeg", ".avif", ".webp"]);

// Parse args
const args = process.argv.slice(2);
const slugIdx = args.indexOf("--slug");
const allFlag = args.includes("--all");

if (!allFlag && slugIdx === -1) {
	console.error(
		"[INFO] Usage:\n  npm run project:compress -- --slug <nom>\n  npm run project:compress -- --all",
	);
	process.exit(1);
}

let sharp;
try {
	sharp = (await import("sharp")).default;
} catch {
	console.error(
		"[ERROR] sharp n'est pas installé. Lancez : npm install -D sharp",
	);
	process.exit(1);
}

async function compressSlug(slug) {
	const dir = path.join(PROJECTS_DIR, slug);
	if (!fs.existsSync(dir)) {
		console.warn(`[WARN]  Dossier introuvable : ${dir}`);
		return;
	}

	const files = fs.readdirSync(dir).filter((f) => {
		const ext = path.extname(f).toLowerCase();
		return SUPPORTED.has(ext) && !f.endsWith(".webp");
	});

	if (files.length === 0) {
		console.log(`[WARN]  ${slug}: aucune image à convertir.`);
		return;
	}

	for (const file of files) {
		const src = path.join(dir, file);
		const base = path.basename(file, path.extname(file));
		const dest = path.join(dir, `${base}.webp`);

		const before = fs.statSync(src).size;
		await sharp(src).webp({ quality: 85 }).toFile(dest);
		const after = fs.statSync(dest).size;
		const saved = (((before - after) / before) * 100).toFixed(1);

		console.log(
			`[INFO]  ${slug}/${file} = ${base}.webp  (${kb(before)} = ${kb(after)}, −${saved}%)`,
		);
	}
}

function kb(bytes) {
	return `${(bytes / 1024).toFixed(1)} Ko`;
}

if (allFlag) {
	const slugs = fs
		.readdirSync(PROJECTS_DIR)
		.filter((f) => fs.statSync(path.join(PROJECTS_DIR, f)).isDirectory());
	for (const slug of slugs) await compressSlug(slug);
} else {
	const slug = args[slugIdx + 1];
	if (!slug) {
		console.error("[ERROR] Fournissez un slug après --slug");
		process.exit(1);
	}
	await compressSlug(slug);
}

console.log(
	"\n[DONE] Terminé. Pensez à mettre à jour vos fichiers MDX si vous changez les noms d'images.\n",
);
