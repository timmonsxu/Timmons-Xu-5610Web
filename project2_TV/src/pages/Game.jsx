import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Timer from "../components/Timer";
import GameBoard from "../components/GameBoard";
import RestartButton from "../components/RestartButton";
import GameStatusBanner from "../components/GameStatusBanner";
import "../styles/game.css";
import { GameProvider, useGame } from "../context/GameContext";

// 👇 包裹一层 useGame 的组件
const GameContent = () => {
  const { enemyBoard, playerBoard, handlePlayerMove } = useGame();

  return (
    <>
      <div className="hero-section">
        <Navbar />
        <h1>Battleship Game</h1>
      </div>

      <div className="container">
        <h1>Battle Game</h1>
        <Timer />
        <GameStatusBanner />
        <GameBoard
          boardType="enemy"
          boardData={enemyBoard}
          onTileClick={handlePlayerMove}
        />
        <GameBoard boardType="player" boardData={playerBoard} />
        <RestartButton />
      </div>

      <Footer />
    </>
  );
};

// 外层提供 GameContext
const Game = () => (
  <GameProvider>
    <GameContent />
  </GameProvider>
);

export default Game;
