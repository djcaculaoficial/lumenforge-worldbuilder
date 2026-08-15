import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));

function revision() {
  if (process.env.LUMENFORGE_SOURCE_REVISION?.trim()) return process.env.LUMENFORGE_SOURCE_REVISION.trim();
  try {
    return execFileSync("git", ["rev-parse", "--short=12", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "local-unversioned";
  }
}

const info = {
  product: "Lumenforge Worldbuilder",
  release: `${packageJson.version} · WORLDBUILDER`,
  sourceRevision: revision(),
  generatedAt: new Date().toISOString(),
};
const output = path.join(root, "client", "src", "lib", "buildInfo.generated.ts");
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, `/** Generated during the verified production build. */\nexport const BUILD_INFO = ${JSON.stringify(info, null, 2)} as const;\n`);
console.log(`Worldbuilder build info: ${info.release} / ${info.sourceRevision}`);
