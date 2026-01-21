import { Category, type GameConfig } from "../types";

const config: GameConfig = {
  name: "Jumping Doodle",
  author: { name: "egordorichev", uid: 24809 },
  description: {
    short: "A multiplayer port of the classic Doodle Jump game.",
    full: "A multiplayer port of the classic Doodle Jump game. Jump on platforms while ascending upward, avoid hazards, and compete against your friends!",
  },
  categories: [Category.PLATFORMER, Category.VERSUS, Category.FASTPACED],
  minPlayers: 1,
  maxPlayers: 2,
  pictures: ["https://www.lexaloffle.com/bbs/thumbs/pico8_jumpingdoodle-0.png"],
  cartUrl: "https://www.lexaloffle.com/bbs/cposts/ju/jumpingdoodle-0.p8.png",
};

export default config;
