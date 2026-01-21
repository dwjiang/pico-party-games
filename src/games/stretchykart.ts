import { Category, type GameConfig } from "../types";

const config: GameConfig = {
  name: "Stretchy Kart",
  author: { name: "HerringboneGames", uid: 44550 },
  description: {
    short: "An old school racing game with pseudo-3D perspective. Race against your friends!",
    full: "An old school racing game with pseudo-3D perspective. Collect hot dogs to gain acceleration and race against your friends! Created for the Stretchy Buoys Jam 2025.",
  },
  categories: [Category.RACING, Category.VERSUS, Category.FASTPACED],
  minPlayers: 1,
  maxPlayers: 2,
  pictures: ["https://www.lexaloffle.com/media/44550/sbj_16.gif"],
  cartUrl: "https://www.lexaloffle.com/bbs/cposts/st/stretchykart-1.p8.png",
};

export default config;
