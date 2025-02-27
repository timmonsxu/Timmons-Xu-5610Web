import React from "react";
import { GameProvider } from "./GameContext";
import Grid from "./Grid";

function App() {
  return (
    <GameProvider>
      <Grid />
    </GameProvider>
  );
}

export default App;
