import { Category, type GameConfig } from "../types";

const config: GameConfig = {
  name: "HITBOX",
  author: { name: "vladcom", uid: 41294 },
  description: {
    short: "A fully 3D fighting game in several urban environments.",
    full: "HITBOX is a fully 3D fighting game that takes place in several urban environments. There's also an animation editor tool for the game that can be accessed at the end of the cart.\n\nPlayer 1 uses arrow keys for movement, Z/O for kick, X for punch, and C for block. Player 2 uses E/S/D/F for movement, W for kick, Q for punch, and Tab for block.",
  },
  categories: [Category.VERSUS, Category.FASTPACED],
  minPlayers: 2,
  maxPlayers: 2,
  pictures: [
    "https://www.lexaloffle.com/media/41294/hit8ox_0.gif",
    "https://www.lexaloffle.com/media/41294/hit8ox%20p8_0.gif",
  ],
  cartUrl: "https://www.lexaloffle.com/bbs/cposts/hi/hit8ox-9.p8.png",
};

export default config;
