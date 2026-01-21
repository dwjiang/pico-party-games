import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { type Category, type GameConfig, gameConfigs } from "../src/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readmePath = join(__dirname, "..", "README.md");

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
  const rows = gameConfigs.map(
    (config) =>
      `| ${config.name} | ${formatAuthor(config.author)} | ${formatPlayers(config)} | ${formatCategories(config.categories)} |`,
  );
  return [header, separator, ...rows].join("\n");
}

// Read existing README
const readme = readFileSync(readmePath, "utf-8");

// Replace the games table section
const tableRegex = /\| Game \| Author \| Players \| Categories \|[\s\S]*?(?=\n\n)/;

const newTable = generateTable();
const updatedReadme = readme.replace(tableRegex, newTable);

writeFileSync(readmePath, updatedReadme);

console.log(`Updated README.md with ${gameConfigs.length} games`);
