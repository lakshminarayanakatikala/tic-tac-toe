import React, { useState } from 'react';
import Game from './pages/Game';

const App = () => {
  const [showGame, setShowGame] = useState(false);
  const [playAgainTrigger, setPlayAgainTrigger] = useState(false);

  const gameRules = `
🧩 1. Game Board
- The game is played on a 3x3 grid (Tic Tac Toe style).
- At most, each player can have 3 active emojis on the board at any time.

😎 2. Emoji Categories
- Players choose emoji categories (e.g., Animals 🐶, Food 🍔, etc.) before the game starts.
- Player 2 (or AI) must choose from the remaining categories not picked by Player 1.
- Each move assigns a random emoji from the player's selected category.

🔁 3. Turn-Based Play
- The game is turn-based.
- Player 1 always starts, followed by Player 2 or the AI.
- Players click on an empty cell to place their emoji.

💨 4. Vanishing Rule (FIFO Logic)
- Players can only have 3 emojis on the board at once.
- If a player places a 4th emoji:
  - Their oldest emoji vanishes automatically (First-In-First-Out).
  - The vacated cell becomes available again.

🏆 5. Winning Condition
- A player wins by aligning 3 of their own emojis:
  - Horizontally
  - Vertically
  - Diagonally
- The winning emojis must all belong to the same player (category-based validation).
- Winning cells are animated to highlight the win.

🧼 6. Game End & Reset
- Once a player wins, the board shows a victory message and two options:
  - 🔁 Play Again – resets the board with the same categories and players.
  - 🔙 Back – goes back to the start screen to select new categories/mode.

💡 7. Game Modes
- Player vs AI – play against the computer, which selects moves randomly.
- Player vs Player – local multiplayer mode.
  `;

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4 space-y-6">
 
      {showGame ? (
        <Game
          playAgainTrigger={playAgainTrigger}
          onPlayAgain={() => setPlayAgainTrigger(prev => !prev)}
          onBack={() => setShowGame(false)}
        />
      ) : (
        <button
          onClick={() => setShowGame(true)}
          className="px-6 py-3 text-xl font-bold bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-primary-dull)] transition-all shadow-lg"
        >
          Start Blink Tac Toe
        </button>
      )}

      {!showGame && (
        <div className="bg-[var(--color-primary)] text-white p-4 rounded-xl shadow-xl max-w-2xl w-full text-left whitespace-pre-wrap text-sm">
          {gameRules}
        </div>
      )}
    </div>
  );
};

export default App;