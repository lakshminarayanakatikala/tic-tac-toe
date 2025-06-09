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

const Game = ({ onPlayAgain, onBack, scores = { player1: 0, player2: 0, ai: 0 }, onWin }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('player1');
  const [moves, setMoves] = useState({ player1: [], player2: [] });
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [mode, setMode] = useState(null);
  const [categorySelected, setCategorySelected] = useState(false);
  const [player1Category, setPlayer1Category] = useState('');
  const [player2Category, setPlayer2Category] = useState('');
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [namesConfirmed, setNamesConfirmed] = useState(false);
  const [nameError, setNameError] = useState(""); // Add this state

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
      // Update score
      if (onWin) onWin(turn === "player2" && mode === "ai" ? "ai" : turn, mode);
    } else {
      setTurn(turn === 'player1' ? 'player2' : 'player1');
    }
  };

  useEffect(() => {
    if (turn === 'player2' && mode === 'ai' && !winner && categorySelected && namesConfirmed) {
      const timeout = setTimeout(() => {
        const aiIndex = getRandomAIMove(board);
        handleMove(aiIndex);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [turn, mode, winner, categorySelected, namesConfirmed, board]);

  // Name input UI
  if (mode && !namesConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-2">Enter Player Name{mode === "pvp" && "s"}</h2>
        <input
          type="text"
          placeholder="Player 1 Name"
          className="px-4 py-2 rounded border border-gray-300 w-full"
          value={player1Name}
          onChange={e => {
            setPlayer1Name(e.target.value);
            setNameError(""); // Clear error on change
          }}
        />
        {mode === "pvp" && (
          <input
            type="text"
            placeholder="Player 2 Name"
            className="px-4 py-2 rounded border border-gray-300 w-full"
            value={player2Name}
            onChange={e => {
              setPlayer2Name(e.target.value);
              setNameError(""); // Clear error on change
            }}
          />
        )}
        {nameError && (
          <div className="text-red-600 font-semibold">{nameError}</div>
        )}
        <button
          className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dull)] transition"
          onClick={() => {
            if (!player1Name.trim() || (mode === "pvp" && !player2Name.trim())) {
              setNameError("Please enter both player names.");
              return;
            }
            if (
              mode === "pvp" &&
              player1Name.trim().toLowerCase() === player2Name.trim().toLowerCase()
            ) {
              setNameError("Both names are same. Please enter different names.");
              return;
            }
            setNamesConfirmed(true);
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="text-center bg-white bg-opacity-90 p-6 rounded-2xl shadow-2xl max-w-lg w-full">
      <h1 className="text-2xl font-extrabold text-[var(--color-primary)] mb-6">
        ✨ Emoji Clash ✨
      </h1>

      {/* Stylish Score Board */}
      {mode && categorySelected && namesConfirmed && (
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-8 bg-gradient-to-r from-green-100 via-blue-100 to-red-100 rounded-xl px-8 py-4 shadow-lg">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-primary flex items-center gap-2">
                <span role="img" aria-label="Player 1">🧑‍🎤</span> {player1Name || "Player 1"}
              </span>
              <span className="text-3xl font-extrabold text-primary-dull mt-1 drop-shadow">{scores.player1}</span>
            </div>
            <div className="text-3xl font-bold text-gray-400">:</div>
            <div className="flex flex-col items-center">
              <span className={`text-lg font-bold ${mode === "ai" ? "text-red-700" : "text-red-700"} flex items-center gap-2`}>
                <span role="img" aria-label={mode === "ai" ? "AI" : "Player 2"}>
                  {mode === "ai" ? "🤖" : "🧑‍🚀"}
                </span>
                {mode === "ai" ? "AI" : player2Name || "Player 2"}
              </span>
              <span className={`text-3xl font-extrabold mt-1 drop-shadow ${mode === "ai" ? "text-red-600" : "text-red-600"}`}>
                {mode === "ai" ? scores.ai : scores.player2}
              </span>
            </div>
          </div>
        </div>
      )}

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
          player1Name={player1Name}
          player2Name ={player2Name}
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
            Turn: {turn === 'player1'
              ? (player1Name || "Player 1")
              : mode === 'ai'
                ? "AI"
                : (player2Name || "Player 2")}
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
                  🎉 {winner === 'player1'
                    ? (player1Name || "Player 1")
                    : mode === 'ai'
                      ? "AI"
                      : (player2Name || "Player 2")} Wins! 🎉
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
