import emojiCategories from './emojiCategories';

const getRandomEmoji = (player, player1Category, player2Category, moves) => {
  const category = player === 'player1' ? player1Category : player2Category;
  const usedEmojis = moves[player].map(m => m.emoji);
  const available = emojiCategories[category].filter(e => !usedEmojis.includes(e));

  if (available.length === 0)
    return emojiCategories[category][Math.floor(Math.random() * emojiCategories[category].length)];

  return available[Math.floor(Math.random() * available.length)];
};

export default getRandomEmoji;
