// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
// Run `npm run build` to regenerate

import type { GameConfig } from "./types";

export { type Author, Category, type GameConfig } from "./types";

import chuchupico from "./games/chuchupico";
import derailed from "./games/derailed";
import freezingknights from "./games/freezingknights";
import hitbox from "./games/hitbox";
import jumpingdoodle from "./games/jumpingdoodle";
import manbomber from "./games/manbomber";
import picoball from "./games/picoball";
import stretchykart from "./games/stretchykart";

export const gameConfigs: readonly GameConfig[] = [
  chuchupico,
  derailed,
  freezingknights,
  hitbox,
  jumpingdoodle,
  manbomber,
  picoball,
  stretchykart,
].sort((a, b) => a.name.localeCompare(b.name));

export default gameConfigs;
