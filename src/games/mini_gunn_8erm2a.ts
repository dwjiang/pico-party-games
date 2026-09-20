import { Category, type GameConfig } from "../types";

const config: GameConfig = {
  name: "Mini Gunn",
  author: { name: "Waporwave" },
  description: {
    short: "Fight to the death with guns and katanas.",
    full: "From the game's Lexaloffle page:\nMini GUNN is a fan demake of the Samurai GUNN series, that distills the fast-paced action into a byte sized couch party versus game. Grab a friend and fight to the death!\n\nFrom the game's Steam page:\nFace off with your friends in a fresh local multiplayer frenzy!\nSky-High Sword Stunts!\n - Swing your sword with precise timing to leap great distances\nDeflect Bullets!\n - It's easy to shoot, but a clever opponent can send your bullets right back to you\nIt's Showdown Time!\n - Only the strongest settle it at sunset",
  },
  categories: [Category.VERSUS, Category.PLATFORMER, Category.FASTPACED],
  pictures: [
    "https://www.lexaloffle.com/media/45923/Mini_Gunn_Box_Art.png",
  ],
  cartUrl: "https://www.lexaloffle.com/bbs/cposts/mi/minigunn-0.p8.png",
};

export default config;
