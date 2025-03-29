import React from "react";
import Tile from "./Tile";
import "../styles/game.css";

const GameBoard = () => {
  const totalTiles = 64; // 8x8 grid for now (可换成 100)
  const mockBoard = Array(totalTiles).fill("");

  // Example: mockBoard[0] = 'hit', mockBoard[4] = 'miss'

  return (
    <div className="game-board">
      <div className="grid">
        {mockBoard.map((type, index) => (
          <Tile key={index} type={type} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
