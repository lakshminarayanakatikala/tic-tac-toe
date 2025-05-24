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

export default checkWinner;
