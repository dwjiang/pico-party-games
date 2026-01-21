# Contributing Games to PICO Party

Thank you for contributing! Here's how to add a new PICO-8 game.

## Prerequisites

- Node.js 18+
- npm

## Setup

1. Fork and clone this repository
2. Run `npm install`

## Adding a New Game

### Step 1: Create the Config File

Create a new file in `src/games/` (e.g., `src/games/mygame.ts`):

```typescript
import { Category, type GameConfig } from "../types";

const config: GameConfig = {
  name: "Game Name",
  author: {
    name: "Author Name",
    uid: 12345, // Optional: Lexaloffle BBS user ID
  },
  description: {
    short: "A one-sentence description for the game card.",
    full: "A longer description with gameplay details.\n\nCan include multiple paragraphs.",
  },
  categories: [Category.COOPERATIVE], // See Available Categories below
  minPlayers: 1,
  maxPlayers: 4,
  pictures: [
    "https://example.com/screenshot1.png",
    "https://example.com/screenshot2.png",
  ],
  cartUrl: "https://www.lexaloffle.com/bbs/cposts/xx/gamename-0.p8.png",
};

export default config;
```

### Step 2: Build and Test

```bash
npm run build
```

Verify there are no TypeScript errors.

### Step 3: Update the README

```bash
npm run update-readme
```

This regenerates the games table in README.md with your new game included.

### Step 4: Submit a Pull Request

1. Commit your changes
2. Push to your fork
3. Open a pull request with:
   - Link to the game on Lexaloffle BBS or itch.io


## Available Categories

- `Category.COOPERATIVE` - Games where players work together
- `Category.VERSUS` - Competitive games
- `Category.FASTPACED` - Action-heavy games
- `Category.STRATEGY` - Games requiring planning
- `Category.PLATFORMER` - Platform games
- `Category.RACING` - Racing games

## Finding Games

Good places to find PICO-8 multiplayer games:

- [Lexaloffle BBS](https://www.lexaloffle.com/bbs/?cat=7&sub=2) - Official PICO-8 forum
- [itch.io PICO-8 games](https://itch.io/games/tag-pico-8) - Indie game platform

## Requirements

- Game must be a PICO-8 game with a publicly accessible `.p8.png` cartridge
- Game should support 2+ players (or have interesting single-player that benefits from streaming)
- Include at least one screenshot or GIF
- Provide accurate player count information
- Use high-quality images (preferably from itch.io or Lexaloffle)

## Tips

- **Finding cartUrl**: On Lexaloffle BBS, right-click the cartridge image and copy the image URL
- **Finding author uid**: The number in the author's profile URL (e.g., `/bbs/?uid=12345`)
- **Screenshots**: itch.io image URLs or Lexaloffle media URLs are preferred
- **Description**: Keep it concise but informative - explain the core gameplay

## Questions?

Open an issue if you have questions about adding a game!
