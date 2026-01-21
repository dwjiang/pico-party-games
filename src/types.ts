/**
 * Author information for a PICO-8 game
 */
export type Author = {
  /** Display name of the author */
  name: string;
  /** Lexaloffle BBS user ID (optional) */
  uid?: number;
};

/**
 * Game categories for filtering and organization
 */
export enum Category {
  COOPERATIVE = "cooperative",
  FASTPACED = "fast-paced",
  STRATEGY = "strategy",
  VERSUS = "versus",
  PLATFORMER = "platformer",
  RACING = "racing",
}

/**
 * Configuration for a PICO-8 game
 */
export type GameConfig = {
  /** Display name of the game */
  name: string;
  /** Author information */
  author: Author;
  /** Description of the game */
  description: {
    /** Short description on the game card when game is selected. One sentence is preferred */
    short: string;
    /** Full description text. Will show when on detailed game view */
    full: string;
  };
  /** Categories for filtering */
  categories: Category[];
  /** Minimum number of players required */
  minPlayers?: number;
  /** Maximum number of players supported */
  maxPlayers?: number;
  /** URLs to screenshot/preview images. Lexaloffle and itch.io URLs are preferred */
  pictures: string[];
  /** URL to the .p8.png cartridge file */
  cartUrl: string;
};
