export const getRandomAIMove = (board) => {
  const emptyIndices = board
    .map((cell, i) => (cell === null ? i : null))   //[null, "🐶", null, "🍕", null, null, "🐱", null, null] --> example : [0, null, 2, null, 4, null, 6, null, 8]
    .filter(i => i !== null);   // example : [0, 2, 4, 6, 8]  == 5
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};