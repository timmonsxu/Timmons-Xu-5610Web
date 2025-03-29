import React from "react";
import "../styles/game.css";

const Tile = ({ tile, x, y, boardType, onClick }) => {
  const { revealed, hit, hasShip } = tile;

  // 计算 CSS class
  let tileClass = "cell";
  let icon = "";

  if (revealed) {
    if (hit) {
      tileClass += " hit"; // 红色背景
      icon = "❌"; // 命中
    } else {
      tileClass += " miss"; // 蓝色背景
      icon = "✔️"; // 未命中
    }
  } else {
    // 如果是玩家棋盘，且这个格子有船，显示黑点
    if (boardType === "player" && hasShip) {
      icon = "⚫";
    }
  }

  // 点击事件（仅敌方可点击）
  const handleClick = () => {
    if (boardType === "enemy" && onClick && !revealed) {
      onClick(x, y);
    }
  };

  return (
    <div className={tileClass} onClick={handleClick}>
      <span className="icon">{icon}</span>
    </div>
  );
};

export default Tile;
