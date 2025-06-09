import React, { useState } from 'react';

const Dropdown = ({ label, selected, onSelect, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left w-full max-w-xs">
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex justify-between items-center w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          {selected || `Select ${label}`}
          <svg
            className="-mr-1 ml-2 h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
          <div className="py-1">
            {options.map(option => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CategorySelector = ({
  player1Category,
  player1Name,
  player2Name,
  setPlayer1Category,
  player2Category,
  setPlayer2Category,
  availableCategories,
  mode,
  onStart,
}) => {
  const getRemainingCategories = (selected) =>
    availableCategories.filter((cat) => cat !== selected);

  return (
    <div className="space-y-6 max-w-md mx-auto text-center">
      <div>
        <p className="mb-2 font-medium">{player1Name} Category</p>
        <Dropdown
          label="Player 1"
          selected={player1Category}
          onSelect={setPlayer1Category}
          options={availableCategories}
        />
      </div>

      {player1Category && (
        <div>
          <p className="mb-2 font-medium">{mode === 'ai' ? 'AI' : player2Name } Category</p>
          <Dropdown
            label={mode === 'ai' ? 'AI' : 'Player 2'}
            selected={player2Category}
            onSelect={setPlayer2Category}
            options={getRemainingCategories(player1Category)}
          />
        </div>
      )}

      {player1Category && player2Category && (
        <button
          onClick={onStart}
          className="mt-4 px-6 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-primary-dull)] transition"
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default CategorySelector;
