import { motion } from 'framer-motion';

const Cell = ({ emoji, onClick, isWinningCell }) => {
  return (
    <motion.button
      className={`
        w-15 h-15 sm:w-20 sm:h-20 md:w-22 md:h-22 xl:w-23 xl:h-23
        border text-4xl flex items-center justify-center rounded-xl shadow-xl 
        ${isWinningCell 
          ? "bg-[var(--color-primary)] text-white border-[var(--color-primary-dull)] animate-[pulse_4s_ease-in-out_infinite]"
          : 'bg-white text-black border-gray-300'}
        transition-all duration-100 ease-in-out
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
