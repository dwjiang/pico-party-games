import { Category, type GameConfig } from "../types";

const config: GameConfig = {
  name: "Xenith",
  author: { name: "Godmil", uid: 20645 },
  description: {
    short: "Survive 50 micro bullet-hell levels.",
    full: "Traverse a series of 10-second levels set over a dozen environments from Earth to the Moon, Mars and beyond, to face off an alien invasion. With no guns, your only ability is to survive. Two game modes are available where you either have to restart every time you die, or are invincible but have to see how few times you can get hit.",
  },
  categories: [Category.FASTPACED],
  minPlayers: 1,
  maxPlayers: 2,
  pictures: [
    "https://i.imghippo.com/files/nUEp4484tNY.png",
    "https://i.imghippo.com/files/aalA1574PMc.png",
    "https://i.imghippo.com/files/mMN8703A.png",
    "https://i.imghippo.com/files/Oo1305qeY.png",
  ],
  cartUrl: "https://www.lexaloffle.com/bbs/cposts/xe/xenith-4.p8.png",
};

export default config;
