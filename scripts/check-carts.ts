import { appendFileSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const gamesDir = join(rootDir, "src", "games");

const URL_RE = /^(.+?)(?:-(\d+))?\.p8\.png$/;
const CART_URL_RE = /cartUrl:\s*"([^"]+)"/;
const MAX_PROBE = 50;
const MISS_STREAK = 5;
const DRY_RUN = process.argv.includes("--dry-run");

type Result =
  | { kind: "ok"; game: string; url: string }
  | { kind: "fixed"; game: string; oldUrl: string; newUrl: string }
  | { kind: "stale"; game: string; oldUrl: string; newUrl: string }
  | { kind: "missing"; game: string; oldUrl: string }
  | { kind: "transient"; game: string; oldUrl: string; reason: string }
  | { kind: "skipped"; game: string; oldUrl: string; reason: string };

function parseUrl(url: string): { prefix: string; revision: number | null } | null {
  const m = url.match(URL_RE);
  if (!m) return null;
  return { prefix: m[1], revision: m[2] ? Number(m[2]) : null };
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function probe(url: string, retries = 2): Promise<number> {
  let lastErr: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      let res = await fetch(url, { method: "HEAD", redirect: "follow" });
      if (res.status === 405) res = await fetch(url, { method: "GET", redirect: "follow" });
      if (res.status >= 500 && i < retries) {
        await sleep(1000 * (i + 1));
        continue;
      }
      return res.status;
    } catch (e) {
      lastErr = e;
      if (i < retries) await sleep(1000 * (i + 1));
    }
  }
  throw lastErr;
}

async function findLatestRevision(
  prefix: string,
  knownHighest: number | null = null,
): Promise<number | null> {
  let highest = knownHighest;
  let misses = 0;
  const start = knownHighest === null ? 0 : knownHighest + 1;
  for (let n = start; n < MAX_PROBE; n++) {
    const status = await probe(`${prefix}-${n}.p8.png`);
    if (status === 200) {
      highest = n;
      misses = 0;
    } else if (status === 404) {
      misses++;
      if (highest !== null && misses >= MISS_STREAK) break;
      if (highest === null && misses >= MISS_STREAK + 5) break;
    } else {
      throw new Error(`Unexpected ${status} for ${prefix}-${n}.p8.png`);
    }
  }
  return highest;
}

async function check(file: string): Promise<Result> {
  const filePath = join(gamesDir, file);
  const content = readFileSync(filePath, "utf-8");
  const game = file.replace(/\.ts$/, "");
  const m = content.match(CART_URL_RE);
  if (!m) return { kind: "skipped", game, oldUrl: "", reason: "no cartUrl found" };

  const oldUrl = m[1];
  const parsed = parseUrl(oldUrl);
  if (!parsed) return { kind: "skipped", game, oldUrl, reason: "URL pattern not recognized" };

  let status: number;
  try {
    status = await probe(oldUrl);
  } catch (e) {
    return { kind: "transient", game, oldUrl, reason: String(e) };
  }

  const applyEdit = (newUrl: string) => {
    if (!DRY_RUN) writeFileSync(filePath, content.replace(`"${oldUrl}"`, `"${newUrl}"`));
  };

  if (status === 200) {
    // Unrevisioned URLs are not assumed to share lineage with `${prefix}-N.p8.png`.
    if (parsed.revision === null) return { kind: "ok", game, url: oldUrl };
    let latest: number | null;
    try {
      latest = await findLatestRevision(parsed.prefix, parsed.revision);
    } catch (e) {
      return { kind: "transient", game, oldUrl, reason: String(e) };
    }
    if (latest !== null && latest > parsed.revision) {
      const newUrl = `${parsed.prefix}-${latest}.p8.png`;
      applyEdit(newUrl);
      return { kind: "stale", game, oldUrl, newUrl };
    }
    return { kind: "ok", game, url: oldUrl };
  }

  if (status === 404) {
    let latest: number | null;
    try {
      latest = await findLatestRevision(parsed.prefix);
    } catch (e) {
      return { kind: "transient", game, oldUrl, reason: String(e) };
    }
    if (latest === null) return { kind: "missing", game, oldUrl };
    const newUrl = `${parsed.prefix}-${latest}.p8.png`;
    applyEdit(newUrl);
    return { kind: "fixed", game, oldUrl, newUrl };
  }

  return { kind: "skipped", game, oldUrl, reason: `HTTP ${status}` };
}

const files = readdirSync(gamesDir)
  .filter((f) => f.endsWith(".ts"))
  .sort();

const results: Result[] = [];
for (const file of files) {
  process.stdout.write(`Checking ${file}... `);
  const r = await check(file);
  console.log(r.kind);
  results.push(r);
}

const buckets = {
  ok: results.filter((r) => r.kind === "ok"),
  fixed: results.filter((r): r is Extract<Result, { kind: "fixed" }> => r.kind === "fixed"),
  stale: results.filter((r): r is Extract<Result, { kind: "stale" }> => r.kind === "stale"),
  missing: results.filter((r): r is Extract<Result, { kind: "missing" }> => r.kind === "missing"),
  transient: results.filter(
    (r): r is Extract<Result, { kind: "transient" }> => r.kind === "transient",
  ),
  skipped: results.filter((r): r is Extract<Result, { kind: "skipped" }> => r.kind === "skipped"),
};

console.log("");
console.log(`Summary (${results.length} games):`);
console.log(`  ok:        ${buckets.ok.length}`);
console.log(`  fixed:     ${buckets.fixed.length}`);
console.log(`  stale:     ${buckets.stale.length}`);
console.log(`  missing:   ${buckets.missing.length}`);
console.log(`  transient: ${buckets.transient.length}`);
console.log(`  skipped:   ${buckets.skipped.length}`);

let body = "";
if (buckets.fixed.length > 0) {
  body += "## Fixed (404 → new revision)\n\n";
  for (const r of buckets.fixed) body += `- **${r.game}**: \`${r.oldUrl}\` → \`${r.newUrl}\`\n`;
  body += "\n";
}
if (buckets.stale.length > 0) {
  body += "## Updated to latest revision (was live but outdated)\n\n";
  for (const r of buckets.stale) body += `- **${r.game}**: \`${r.oldUrl}\` → \`${r.newUrl}\`\n`;
  body += "\n";
}
if (buckets.missing.length > 0) {
  body += "## Needs manual review (404, no replacement found)\n\n";
  for (const r of buckets.missing) body += `- **${r.game}**: \`${r.oldUrl}\`\n`;
  body += "\n";
}
if (buckets.transient.length > 0) {
  body += "## Transient errors (will retry next run)\n\n";
  for (const r of buckets.transient) body += `- **${r.game}**: \`${r.oldUrl}\` — ${r.reason}\n`;
  body += "\n";
}

const prBodyFile = process.env.PR_BODY_FILE;
if (prBodyFile) writeFileSync(prBodyFile, body || "No changes needed.\n");

const stepSummary = process.env.GITHUB_STEP_SUMMARY;
if (stepSummary) appendFileSync(stepSummary, body || "All cartUrls are healthy.\n");
