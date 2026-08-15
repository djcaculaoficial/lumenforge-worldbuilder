import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const dist = path.join(root, "dist", "public");

function sourceRevision() {
  if (process.env.LUMENFORGE_SOURCE_REVISION?.trim()) return process.env.LUMENFORGE_SOURCE_REVISION.trim();
  try {
    return execFileSync("git", ["rev-parse", "--short=12", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "local-unversioned";
  }
}

if (!existsSync(dist)) throw new Error("Expected frontend build output was not found.");

function files(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(folder, entry.name);
    return entry.isDirectory() ? files(full) : [full];
  });
}

const digest = createHash("sha256");
const entries = files(dist).sort().map((full) => {
  const relative = path.relative(dist, full).replaceAll(path.sep, "/");
  const content = readFileSync(full);
  digest.update(relative); digest.update("\0"); digest.update(content);
  return { file: relative, bytes: statSync(full).size };
});

const verification = {
  product: "Lumenforge Worldbuilder",
  release: process.env.LUMENFORGE_RELEASE_TAG || "local-build",
  sourceRevision: sourceRevision(),
  bundleSha256: digest.digest("hex"),
  generatedAt: new Date().toISOString(),
  files: entries,
};
writeFileSync(path.join(dist, "worldbuilder-verification.json"), `${JSON.stringify(verification, null, 2)}\n`);
console.log(`Worldbuilder bundle SHA-256: ${verification.bundleSha256}`);
