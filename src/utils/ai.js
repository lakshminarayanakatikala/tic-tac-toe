export const getRandomAIMove = (board) => {
  const emptyIndices = board
    .map((cell, i) => (cell === null ? i : null))
    .filter(i => i !== null);
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};