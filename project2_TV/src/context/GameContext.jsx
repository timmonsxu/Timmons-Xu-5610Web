import React, { createContext, useState, useContext, useEffect } from "react";
import {
  generateEmptyBoard,
  placeShipsRandomly,
  checkIfAllShipsSunk,
} from "../utils/boardUtils";
import { getRandomUntriedTile } from "../utils/aiLogic";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const BOARD_SIZE = 10;

  // 初始棋盘和游戏状态
  const [playerBoard, setPlayerBoard] = useState(
    generateEmptyBoard(BOARD_SIZE)
  );
  const [enemyBoard, setEnemyBoard] = useState(generateEmptyBoard(BOARD_SIZE));
  const [turn, setTurn] = useState("player");
  const [gameStatus, setGameStatus] = useState("playing");
  const [startTime, setStartTime] = useState(Date.now());

  // 初始化游戏（重置）
  const resetGame = () => {
    const newPlayerBoard = generateEmptyBoard(BOARD_SIZE);
    const newEnemyBoard = generateEmptyBoard(BOARD_SIZE);

    placeShipsRandomly(newPlayerBoard);
    placeShipsRandomly(newEnemyBoard);

    setPlayerBoard(newPlayerBoard);
    setEnemyBoard(newEnemyBoard);
    setTurn("player");
    setGameStatus("playing");
    setStartTime(Date.now());
  };

  // 初始启动时生成棋盘
  useEffect(() => {
    resetGame();
  }, []);

  // 玩家点击敌方格子
  const handlePlayerMove = (x, y) => {
    if (turn !== "player" || gameStatus !== "playing") return;

    const newBoard = [...enemyBoard.map((row) => [...row])];
    const tile = newBoard[x][y];

    if (tile.revealed) return; // 不允许重复点击

    tile.revealed = true;
    tile.hit = tile.hasShip;

    setEnemyBoard(newBoard);

    // 胜负判断
    if (checkIfAllShipsSunk(newBoard)) {
      setGameStatus("won");
      return;
    }

    setTurn("ai"); // 交给 AI
  };

  // AI 行动逻辑（简化）
  useEffect(() => {
    if (turn === "ai" && gameStatus === "playing") {
      const timer = setTimeout(() => {
        const [x, y] = getRandomUntriedTile(playerBoard);
        const newBoard = [...playerBoard.map((row) => [...row])];
        const tile = newBoard[x][y];

        tile.revealed = true;
        tile.hit = tile.hasShip;

        setPlayerBoard(newBoard);

        if (checkIfAllShipsSunk(newBoard)) {
          setGameStatus("lost");
        } else {
          setTurn("player");
        }
      }, 800); // 加个延迟模拟思考时间

      return () => clearTimeout(timer);
    }
  }, [turn, gameStatus, playerBoard]);

  return (
    <GameContext.Provider
      value={{
        playerBoard,
        enemyBoard,
        turn,
        gameStatus,
        startTime,
        handlePlayerMove,
        resetGame,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
