import { readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { GameConfig } from "./types";

// Re-export types
export { type Author, Category, type GameConfig } from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

const gamesDir = join(__dirname, "games");
const files = readdirSync(gamesDir).filter(
  (file: string) => file.endsWith(".ts") || file.endsWith(".js"),
);

export const gameConfigs: readonly GameConfig[] = files
  .map((file) => {
    const modulePath = join(gamesDir, file);
    const module = require(modulePath);
    return module.default as GameConfig;
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export default gameConfigs;
