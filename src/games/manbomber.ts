import { Category, type GameConfig } from "../types";

const config: GameConfig = {
  name: "Manbomber",
  author: { name: "fresh-d" },
  description: {
    short: "An explosive homage to the old-time multiplayer classic made with PICO-8!",
    full: "Welcome to Manbomber, an explosive homage to the old-time multiplayer classic made with PICO-8!\n\nIn this game, your goal is to drop bombs on the battlefield to eliminate all other players in time and be the last manbomber standing. The game can be played with up to 4 players battling each other. While in the 2-player mode, both players can use the same keyboard to control their manbomber, a controller for each player is required for all other modes. Any Controller which can be connected to your device will do! So grab a couple of friends, choose one of the three battlefields and blast off!",
  },
  categories: [Category.VERSUS, Category.FASTPACED],
  minPlayers: 2,
  maxPlayers: 4,
  pictures: [
    "https://img.itch.zone/aW1hZ2UvODYzMDU0LzQ5NDYwMzEuZ2lm/347x500/M5AXO7.gif",
    "https://img.itch.zone/aW1hZ2UvODYzMDU0LzQ5NDY1NTAuZ2lm/347x500/ZrNukw.gif",
    "https://img.itch.zone/aW1hZ2UvODYzMDU0LzQ5NDY3MzkucG5n/347x500/1xqrVp.png",
    "https://img.itch.zone/aW1hZ2UvODYzMDU0LzQ5NDY3NDAucG5n/347x500/i0sBPB.png",
  ],
  cartUrl: "https://www.lexaloffle.com/bbs/cposts/ma/manbomber-0.p8.png",
};

export default config;
