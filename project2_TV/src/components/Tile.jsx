import React from "react";
import "../styles/game.css";

const Tile = ({ type }) => {
  // type: '', 'hit', 'miss'
  return <div className={`cell ${type}`}></div>;
};

export default Tile;
