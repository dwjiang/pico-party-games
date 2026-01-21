import { Category, type GameConfig } from "../types";

const config: GameConfig = {
  name: "Derailed!",
  author: { name: "Yolwoocle", uid: 47064 },
  description: {
    short:
      "A 2-player demake of Unrailed! where you build tracks to keep a train on its rails.",
    full: "Derailed! is a 2-player demake of Unrailed!, a co-op game where you build tracks to keep a train on its rails. Communication is vital!",
  },
  categories: [Category.COOPERATIVE, Category.FASTPACED, Category.STRATEGY],
  minPlayers: 1,
  maxPlayers: 2,
  pictures: [
    "https://img.itch.zone/aW1nLzcxNTQ4ODkucG5n/original/N8FGVO.png",
    "https://www.lexaloffle.com/media/47064/12_derailed_tutorial.png",
  ],
  cartUrl: "https://www.lexaloffle.com/bbs/cposts/de/derailed-0.p8.png",
};

export default config;
