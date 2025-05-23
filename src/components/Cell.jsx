import { motion } from 'framer-motion';

const Cell = ({ emoji, onClick, isWinningCell }) => {
  return (
    <motion.button
      className={`
        w-17 h-17 sm:w-21 sm:h-21 md:w-24 md:h-24 xl:w-26 xl:h-26
        border text-4xl flex items-center justify-center rounded-xl shadow-xl
        ${isWinningCell 
          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary-dull)] animate-pulse' 
          : 'bg-white text-black border-gray-300'}
        transition-all duration-300 ease-in-out
      `}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      {emoji}
    </motion.button>
  );
};

export default Cell;
