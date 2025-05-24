import React, { useState, useEffect } from 'react';
import emojiCategories from '../utils/emojiCategories';
import getRandomEmoji from '../utils/getRandomEmoji';
import checkWinner from '../utils/checkWinner';
import { getRandomAIMove } from '../utils/ai';
import GameBoard from './GameBoard';
import CategorySelector from './CategorySelector';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import winAnimation from '../assets/winAnimation.json'; 

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

  const handleMove = (index) => {
    if (board[index] !== null || winner) return;

    const emoji = getRandomEmoji(turn, player1Category, player2Category, moves);
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

  return (
    <div className="text-center bg-white bg-opacity-90 p-6 rounded-2xl shadow-2xl max-w-lg w-full">
      <h1 className="text-2xl font-extrabold text-[var(--color-primary)] mb-6">
        ✨ Blink Tac Toe ✨
      </h1>

      {!mode ? (
        <>
          <p className="mb-4 text-xl font-semibold">Choose Game Mode:</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setMode('ai')}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dull)] transition"
            >
              Player vs AI
            </button>
            <button
              onClick={() => setMode('pvp')}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dull)] transition"
            >
              Player vs Player
            </button>
          </div>
        </>
      ) : !categorySelected ? (
        <CategorySelector
          player1Category={player1Category}
          setPlayer1Category={setPlayer1Category}
          player2Category={player2Category}
          setPlayer2Category={setPlayer2Category}
          availableCategories={Object.keys(emojiCategories)}
          mode={mode}
          onStart={() => setCategorySelected(true)}
        />
      ) : (
        <>
          <p className="mb-4 font-semibold text-xl">
            Turn: {turn === 'player1' ? 'Player 1' : mode === 'ai' ? 'AI' : 'Player 2'}
          </p>
          <GameBoard board={board} handleMove={handleMove} winningLine={winningLine} />

          {winner && (
            <>
              <motion.div
                className="mt-6 flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Lottie animationData={winAnimation} loop={false} className="w-48 h-48" />
                <div className="text-3xl font-bold text-green-600 mt-2">
                  🎉 {winner === 'player1' ? 'Player 1' : mode === 'ai' ? 'AI' : 'Player 2'} Wins! 🎉
                </div>
              </motion.div>

              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => {
                    setBoard(Array(9).fill(null));
                    setMoves({ player1: [], player2: [] });
                    setWinner(null);
                    setWinningLine([]);
                    setTurn('player1');
                  }}
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dull)] transition"
                >
                  Play Again
                </button>
                <button
                  onClick={onBack}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Back
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Game;
