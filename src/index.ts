// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
// Run `npm run sync` to regenerate

import type { GameConfig } from "./types";

export { type Author, Category, type GameConfig } from "./types";

import chuchupico from "./games/chuchupico";
import derailed from "./games/derailed";
import jumpingdoodle from "./games/jumpingdoodle";
import manbomber from "./games/manbomber";
import stretchykart from "./games/stretchykart";

export const gameConfigs: readonly GameConfig[] = [
  chuchupico,
  derailed,
  jumpingdoodle,
  manbomber,
  stretchykart,
].sort((a, b) => a.name.localeCompare(b.name));

export default gameConfigs;
