import { Category, type GameConfig } from "../types";

const config: GameConfig = {
  name: "PICO-BALL",
  author: { name: "Munchkin", uid: 48557 },
  description: {
    short: "A sports game mashup of tennis, volleyball, squash, and wallball.",
    full: "PICO-BALL is a sports game starring Jelpi! Play solo or together in a mashup of tennis, volleyball, squash, and wallball where the only rule is: two bounces on one side is a point for the other.\n\nFeatures multiple game modes including Campaign (solo), Versus (face each other in a PICO-BALL match with powerups), and Co-op (work together to keep the ball in the air).",
  },
  categories: [Category.VERSUS, Category.COOPERATIVE, Category.FASTPACED],
  minPlayers: 1,
  maxPlayers: 2,
  pictures: ["https://www.lexaloffle.com/bbs/cposts/pi/pico_ball-5.p8.png"],
  cartUrl: "https://www.lexaloffle.com/bbs/cposts/pi/pico_ball-5.p8.png",
};

export default config;
