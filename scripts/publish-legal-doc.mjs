#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LEGAL_DIR = path.join(ROOT, "content", "politics");

function today() {
  return new Date().toISOString().slice(0, 10);
}

const args = process.argv.slice(2);
const slugIdx = args.indexOf("--slug");

if (slugIdx === -1 || !args[slugIdx + 1]) {
  console.error("Usage:\n  npm run legal:publish -- --slug <nom>");
  process.exit(1);
}

const slug = args[slugIdx + 1];
const filePath = path.join(LEGAL_DIR, `${slug}.md`);

if (!fs.existsSync(filePath)) {
  console.error(`❌  Fichier introuvable : ${filePath}`);
  process.exit(1);
}

const raw = fs.readFileSync(filePath, "utf8");
const { data, content } = matter(raw);
const updated = today();
data.updated = updated;

const output = matter.stringify(content, data);
fs.writeFileSync(filePath, output, "utf8");

console.log(`\n✅  ${slug}.md publié — updated: ${updated}\n`);
