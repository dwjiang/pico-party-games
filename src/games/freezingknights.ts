import { Category, type GameConfig } from "../types";

const config: GameConfig = {
  name: "Freezing Knights",
  author: { name: "tinyevilwizard", uid: 70107 },
  description: {
    short: "A light co-op turn-based RPG for two players.",
    full: "Freezing Knights is a light co-op turn-based RPG. Take control of two knights and try to reach the end of the perilous snowy mountain paths by avoiding enemy attacks and powering-up your characters.\n\nWork together with a friend to survive the frozen wilderness!",
  },
  categories: [Category.COOPERATIVE, Category.STRATEGY],
  minPlayers: 1,
  maxPlayers: 2,
  pictures: ["https://www.lexaloffle.com/media/70107/freezing_knight_store_battle3.gif"],
  cartUrl: "https://www.lexaloffle.com/bbs/cposts/fr/freezing_knights-9.p8.png",
};

export default config;
