// src/utils/boardUtils.js

// 船只定义：长度从长到短
const SHIPS = [
  { name: "carrier", size: 5 },
  { name: "battleship", size: 4 },
  { name: "cruiser", size: 3 },
  { name: "submarine", size: 3 },
  { name: "destroyer", size: 2 },
];

// 1. 创建空棋盘
export const generateEmptyBoard = (size = 10) => {
  const board = [];

  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push({
        hasShip: false,
        revealed: false,
        hit: false,
        shipId: null, // 可选：标记属于哪艘船
      });
    }
    board.push(row);
  }

  return board;
};

// 2. 随机放置船只
export const placeShipsRandomly = (board) => {
  const size = board.length;
  let shipCounter = 0;

  for (const ship of SHIPS) {
    let placed = false;

    while (!placed) {
      const isHorizontal = Math.random() < 0.5;
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);

      const canPlace = checkPlacement(board, x, y, ship.size, isHorizontal);

      if (canPlace) {
        for (let i = 0; i < ship.size; i++) {
          const row = isHorizontal ? x : x + i;
          const col = isHorizontal ? y + i : y;

          board[row][col].hasShip = true;
          board[row][col].shipId = shipCounter;
        }
        shipCounter++;
        placed = true;
      }
    }
  }
};

// 辅助函数：判断某位置是否能放船
const checkPlacement = (board, x, y, length, isHorizontal) => {
  const size = board.length;

  for (let i = 0; i < length; i++) {
    const row = isHorizontal ? x : x + i;
    const col = isHorizontal ? y + i : y;

    if (row >= size || col >= size) return false;
    if (board[row][col].hasShip) return false;
  }

  return true;
};

// 3. 判断所有船是否被击沉
export const checkIfAllShipsSunk = (board) => {
  for (let row of board) {
    for (let tile of row) {
      if (tile.hasShip && !tile.revealed) {
        return false;
      }
    }
  }
  return true;
};
