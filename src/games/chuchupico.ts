import { Category, type GameConfig } from "../types";

const config: GameConfig = {
  name: "ChuChu Pico",
  author: { name: "Conor", uid: 63521 },
  description: {
    short: "A remake of the classic Dreamcast game Chu Chu Rocket.",
    full: "Chu Chu Pico is a remake of the classic Dreamcast game Chu Chu Rocket.\n\nThe game contains 16 levels. Use the arrow keys to move your cursor. Press the O button and a direction to place an arrow on the grid. Mice and cats will follow the arrows. Steer the mice into your rocket (the red or green circle), and steer the cats into your opponent's rocket. Mice score 1 point, or 50 points for a gold mouse. Cats remove 1/3 of your total score. The round ends after 3 minutes and then moves to a new random map. The results of the previous 10 games are shown on the left.",
  },
  categories: [Category.VERSUS, Category.FASTPACED, Category.STRATEGY],
  minPlayers: 1,
  maxPlayers: 2,
  pictures: [
    "https://img.itch.zone/aW1hZ2UvMTc5NTY2Mi8xNTgyNDM3NC5naWY=/347x500/knHMYv.gif",
    "https://img.itch.zone/aW1nLzEwNTQ5NTUyLmpwZw==/original/qLUbPf.jpg",
    "https://img.itch.zone/aW1hZ2UvMTc5NTY2Mi8xMDU0OTU2MC5qcGc=/347x500/7cbPFu.jpg",
    "https://img.itch.zone/aW1hZ2UvMTc5NTY2Mi8xMDU0OTU1OS5qcGc=/original/maubaF.jpg",
  ],
  cartUrl: "https://www.lexaloffle.com/bbs/cposts/fa/fajufupuze-0.p8.png",
};

export default config;
