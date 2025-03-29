// src/utils/aiLogic.js

// AI 随机选择一个未被 revealed 的格子
export const getRandomUntriedTile = (board) => {
  const untriedTiles = [];

  board.forEach((row, x) => {
    row.forEach((tile, y) => {
      if (!tile.revealed) {
        untriedTiles.push([x, y]);
      }
    });
  });

  if (untriedTiles.length === 0) {
    return null; // 所有格子都试过了（理论上不太会发生）
  }

  const randomIndex = Math.floor(Math.random() * untriedTiles.length);
  return untriedTiles[randomIndex];
};
