import React, { useState, useContext } from "react";
import { GameContext } from "./GameContext";

function Cell() {
  const [isOn, setIsOn] = useState(false);
  const { handleToggle } = useContext(GameContext);

  const handleClick = () => {
    setIsOn(!isOn);
    handleToggle(!isOn);
  };

  return <div className="cell" onClick={handleClick}></div>;
}

export default Cell;
