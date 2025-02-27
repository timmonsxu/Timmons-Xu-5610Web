import React, { createContext, useState } from "react";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [count, setCount] = useState(0);

  const handleToggle = (isOn) => {
    setCount((prevCount) => (isOn ? prevCount + 1 : prevCount - 1));
  };

  return (
    <GameContext.Provider value={{ count, handleToggle }}>
      {children}
    </GameContext.Provider>
  );
}
