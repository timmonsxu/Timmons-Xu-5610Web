import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Timer from "../components/Timer";
import GameBoard from "../components/GameBoard";
import RestartButton from "../components/RestartButton";
import GameStatusBanner from "../components/GameStatusBanner";
import "../styles/game.css";
import { GameProvider } from "../context/GameContext";

const Game = () => (
  <GameProvider>
    <div className="hero-section">
      <Navbar />
      <h1>Battleship Game</h1>
    </div>

    <div className="container">
      <h1>Battle Game</h1>
      <Timer />
      <GameStatusBanner /> {/* 🟡 放在这里最自然 */}
      <GameBoard
        boardType="enemy"
        boardData={enemyBoard}
        onTileClick={handlePlayerMove}
      />
      <GameBoard boardType="player" boardData={playerBoard} />
      <RestartButton />
    </div>
    <Footer />
  </GameProvider>
);

export default Game;
