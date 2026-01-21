import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { GameConfig } from "./types";

// Re-export types
export { type Author, Category, type GameConfig } from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const gamesDir = join(__dirname, "games");
const files = readdirSync(gamesDir).filter(
  (file: string) => file.endsWith(".ts") || file.endsWith(".js"),
);

const modules = await Promise.all(
  files.map((file) => import(join(gamesDir, file))),
);

export const gameConfigs: readonly GameConfig[] = modules
  .map((mod) => mod.default as GameConfig)
  .sort((a, b) => a.name.localeCompare(b.name));

export default gameConfigs;
