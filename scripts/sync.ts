import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, parse } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { Category, GameConfig } from "../src/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const srcDir = join(rootDir, "src");
const gamesDir = join(srcDir, "games");
const indexPath = join(srcDir, "index.ts");
const readmePath = join(rootDir, "README.md");

function generateIndex(): string[] {
  const gameFiles = readdirSync(gamesDir)
    .filter((file) => file.endsWith(".ts"))
    .sort();

  const imports = gameFiles
    .map((file) => {
      const name = parse(file).name;
      return `import ${name} from "./games/${name}";`;
    })
    .join("\n");

  const configArray = gameFiles.map((file) => parse(file).name).join(",\n  ");

  const content = `// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
// Run \`npm run build\` to regenerate

import type { GameConfig } from "./types";

export { type Author, Category, type GameConfig } from "./types";

${imports}

export const gameConfigs: readonly GameConfig[] = [
  ${configArray},
].sort((a, b) => a.name.localeCompare(b.name));

export default gameConfigs;
`;

  writeFileSync(indexPath, content);
  console.log(`Generated src/index.ts with ${gameFiles.length} games`);

  return gameFiles.map((file) => parse(file).name);
}

async function updateReadme(gameNames: string[]): Promise<void> {
  const configs: GameConfig[] = await Promise.all(
    gameNames.map(async (name) => {
      const filePath = join(gamesDir, `${name}.ts`);
      const fileUrl = pathToFileURL(filePath).href;
      const mod = await import(fileUrl);
      return mod.default as GameConfig;
    }),
  );

  configs.sort((a, b) => a.name.localeCompare(b.name));

  function formatAuthor(author: GameConfig["author"]): string {
    if (author.uid) {
      return `[${author.name}](https://www.lexaloffle.com/bbs/?uid=${author.uid})`;
    }
    return author.name;
  }

  function formatPlayers(config: GameConfig): string {
    const min = config.minPlayers ?? 1;
    const max = config.maxPlayers ?? min;
    if (min === max) return `${min}`;
    return `${min}-${max}`;
  }

  function capitalize(str: string): string {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function formatCategories(categories: Category[]): string {
    return categories.map((cat) => capitalize(cat)).join(", ");
  }

  function generateTable(): string {
    const header = "| Game | Author | Players | Categories |";
    const separator = "|------|--------|---------|------------|";
    const rows = configs.map(
      (config) =>
        `| ${config.name} | ${formatAuthor(config.author)} | ${formatPlayers(config)} | ${formatCategories(config.categories)} |`,
    );
    return [header, separator, ...rows].join("\n");
  }

  const readme = readFileSync(readmePath, "utf-8");
  const tableRegex = /\| Game \| Author \| Players \| Categories \|[\s\S]*?(?=\n\n)/;
  const newTable = generateTable();
  const updatedReadme = readme.replace(tableRegex, newTable);
  writeFileSync(readmePath, updatedReadme);
  console.log(`Updated README.md with ${configs.length} games`);
}

// ============================================
// Main
// ============================================

const gameNames = generateIndex();
await updateReadme(gameNames);
