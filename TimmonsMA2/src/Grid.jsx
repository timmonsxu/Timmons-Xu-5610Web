import React, { useContext } from "react";
import { GameContext } from "./GameContext";
import Cell from "./Cell";

function Grid() {
  const { count } = useContext(GameContext);

  return (
    <div className="grid-container">
      <h2>On Cells: {count}</h2>
      <div className="grid">
        {[...Array(4)].map((_, i) => (
          <Cell key={i} />
        ))}
      </div>
    </div>
  );
}

export default Grid;
