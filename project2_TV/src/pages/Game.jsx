import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Timer from "../components/Timer";
import GameBoard from "../components/GameBoard";
import RestartButton from "../components/RestartButton";
import "../styles/game.css";

const Game = () => (
  <>
    <div className="hero-section">
      <Navbar />
      <h1>Battleship Game</h1>
    </div>
    <div className="container">
      <h1>Battle Game</h1>
      <Timer />
      <GameBoard />
      <RestartButton />
    </div>
    <Footer />
  </>
);

export default Game;
