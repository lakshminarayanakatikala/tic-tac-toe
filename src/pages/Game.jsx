import React, { useState, useEffect } from 'react';
import Cell from '../components/Cell';
import { getRandomAIMove } from '../utils/ai';
import { AnimatePresence, motion } from 'framer-motion';

const emojiCategories = {
  Animals: ['🐱', '🐶', '🐵', '🦊', '🐯', '🦁', '🐼', '🐸', '🐷', '🐨', '🦓', '🐰', '🐮', '🐔', '🐙', '🐢', '🐧', '🐍', '🦜', '🦘'],
  Food: ['🍕', '🍟', '🍔', '🍩', '🍣', '🍙', '🍗', '🍜', '🍪', '🍞', '🥐', '🥞', '🥗', '🍛', '🍦', '🍫', '🍰', '🍇', '🍉', '🍒'],
  Sports: ['⚽', '🏀', '🏈', '🎾', '🏐', '🏉', '🥏', '🎳', '🥊', '⛳', '🏓', '🎯', '🥋', '⛸️', '🤺', '🏹', '🥌', '🚴‍♂️', '🏇', '🏂'],
  Faces: ['😀', '😎', '🥳', '😭', '😡', '😍', '😱', '😴', '🤓', '🤔', '😇', '😤', '😅', '😜', '😬', '🤠', '🥶', '😈', '🤡', '😷'],
  Nature: ['🌳', '🌻', '🌈', '⛄', '🌴', '🍁', '🌼', '🌷', '🌹', '🌾', '🌵', '🌸', '🍀', '🪵', '🍂', '🍃', '🪺', '🪸', '🪷', '🪹'],
  Travel: ['🚗', '✈️', '🚀', '🚢', '🚆', '🚌', '🚲', '🚁', '🚤', '🏍️', '🛵', '🚜', '🚟', '🚠', '🚡', '🚚', '🛺', '🚇', '🛫', '🛬'],
  Music: ['🎵', '🎸', '🎺', '🥁', '🎻', '🎷', '🎼', '🎤', '🎧', '📯', '🎚️', '🎙️', '🎛️', '🪗', '🪕', '📻', '🎞️', '📼', '🔊', '🔔'],
  Symbols: ['❤️', '💡', '🔥', '✨', '💥', '💫', '❣️', '💤', '💯', '✅', '⚡', '🔔', '🔒', '🔓', '💎', '🛑', '❌', '➕', '➖', '➗'],
  Jobs: ['👨‍💻', '👩‍🍳', '🧑‍🏫', '👨‍🚀', '👩‍🎨', '👨‍🔬', '👩‍⚕️', '👨‍✈️', '👮', '🕵️', '🧑‍🚒', '👷', '🧑‍🌾', '🧑‍🔧', '👩‍⚖️', '🧑‍💼', '🧑‍✈️', '👩‍🔬', '🧑‍🎓', '👨‍🎓'],
  Drinks: ['🍺', '☕', '🥤', '🍷', '🍸', '🍹', '🥂', '🧃', '🧉', '🍼', '🍶', '🫖', '🧊', '🍵', '🍾', '🥃', '🧋', '🥛', '🫗', '🫙'],
  Tech: ['💻', '📱', '🖥️', '🕹️', '🧠', '📡', '🖨️', '📷', '🖱️', '💽', '🧮', '🗜️', '🧲', '💾', '📼', '💿', '📀', '📠', '🖲️', '🪟'],
  Weather: ['☀️', '🌧️', '⛈️', '❄️', '🌩️', '🌤️', '🌪️', '🌫️', '🌨️', '🌦️', '🌬️', '☁️', '🌡️', '🌞', '🌂', '🌈', '☔', '🌫️', '🌤️', '⛅'],
  Fantasy: ['🐉', '🧚', '🧙', '🦄', '🧜', '🧞', '🧛', '👻', '🎃', '👹', '👺', '🕸️', '🧟', '👽', '👾', '🧌', '🦸', '🦹', '🪄', '🔮']
};

const Game = ({ onPlayAgain, onBack }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('player1');
  const [moves, setMoves] = useState({ player1: [], player2: [] });
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [mode, setMode] = useState(null);
  const [categorySelected, setCategorySelected] = useState(false);
  const [player1Category, setPlayer1Category] = useState('');
  const [player2Category, setPlayer2Category] = useState('');

  const availableCategories = Object.keys(emojiCategories);
  const getRemainingCategories = (selected) => availableCategories.filter(cat => cat !== selected);

  const handleMove = (index) => {
    if (board[index] !== null || winner) return;
    const emoji = getRandomEmoji(turn);
    const newBoard = [...board];
    newBoard[index] = { player: turn, emoji };

    const newMoves = [...moves[turn], { index, emoji }];
    if (newMoves.length > 3) {
      const removed = newMoves.shift();
      newBoard[removed.index] = null;
    }

    setMoves({ ...moves, [turn]: newMoves });
    setBoard(newBoard);

    const result = checkWinner(newBoard, turn);
    if (result) {
      setWinner(turn);
      setWinningLine(result);
    } else {
      setTurn(turn === 'player1' ? 'player2' : 'player1');
    }
  };

  useEffect(() => {
    if (turn === 'player2' && mode === 'ai' && !winner && categorySelected) {
      const timeout = setTimeout(() => {
        const aiIndex = getRandomAIMove(board);
        handleMove(aiIndex);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [turn]);

  const getRandomEmoji = (player) => {
    const category = player === 'player1' ? player1Category : player2Category;
    const usedEmojis = moves[player].map(m => m.emoji);
    const available = emojiCategories[category].filter(e => !usedEmojis.includes(e));

    if (available.length === 0) return emojiCategories[category][Math.floor(Math.random() * emojiCategories[category].length)];

    return available[Math.floor(Math.random() * available.length)];
  };

  const checkWinner = (brd, player) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (brd[a]?.player === player && brd[b]?.player === player && brd[c]?.player === player) {
        return line;
      }
    }
    return null;
  };

  return (
    <div className="text-center bg-white bg-opacity-90 p-6 rounded-2xl shadow-2xl max-w-lg w-full">
      <h1 className="text-2xl font-extrabold text-[var(--color-primary)] mb-6">
        ✨ Blink Tac Toe ✨
      </h1>

      {!mode ? (
        <div>
          <p className="mb-4 text-xl font-semibold">Choose Game Mode:</p>
          <button onClick={() => setMode('ai')} className="px-4 py-2 bg-[var(--color-primary)] text-white m-2 rounded-lg shadow-lg hover:scale-105 transition-transform">Player vs AI</button>
          <button onClick={() => setMode('pvp')} className="px-4 py-2 bg-[var(--color-primary-dull)] text-white m-2 rounded-lg shadow-lg hover:scale-105 transition-transform">Player vs Player</button>
        </div>
      ) : !categorySelected ? (
        <div className="space-y-4">
          <div>
            <label className="mr-2 font-medium">Player 1 Category:</label>
            <select value={player1Category} onChange={(e) => setPlayer1Category(e.target.value)} className="p-2 rounded-lg border">
              <option value="" disabled>Select</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {player1Category && (
            <div>
              <label className="mr-2 font-medium">{mode === 'ai' ? 'AI' : 'Player 2'} Category:</label>
              <select
                value={player2Category}
                onChange={(e) => setPlayer2Category(e.target.value)}
                className="p-2 rounded-lg border"
              >
                <option value="" disabled>Select</option>
                {getRemainingCategories(player1Category).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}
          {player1Category && player2Category && (
            <button onClick={() => setCategorySelected(true)} className="mt-4 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dull)] transition-transform">Start Game</button>
          )}
        </div>
      ) : (
        <>
          <p className="mb-4 font-semibold text-xl">Turn: {turn === 'player1' ? 'Player 1' : mode === 'ai' ? 'AI' : 'Player 2'}</p>
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {board.map((cell, i) => (
              <AnimatePresence key={i}>
                <Cell
                  key={i}
                  emoji={cell?.emoji}
                  onClick={() => handleMove(i)}
                  isWinningCell={winningLine.includes(i)}
                />
              </AnimatePresence>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            {winner && (
              <motion.div
                className="text-2xl font-extrabold text-[var(--color-primary)] mb-6"
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1.2, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                🎉 {winner === 'player1' ? 'Player 1' : mode === 'ai' ? 'AI' : 'Player 2'} Wins! 🎉
              </motion.div>
            )}
            {winner && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setBoard(Array(9).fill(null));
                    setMoves({ player1: [], player2: [] });
                    setWinner(null);
                    setWinningLine([]);
                    setTurn('player1');
                  }}
                  className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dull)]"
                >
                  Play Again
                </button>
                <button onClick={onBack} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800">
                  Back
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
