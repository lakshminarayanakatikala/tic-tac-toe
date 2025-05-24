import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Cell from './Cell';

const GameBoard = ({ board, handleMove, winningLine }) => {
  return (
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
  );
};

export default GameBoard;
