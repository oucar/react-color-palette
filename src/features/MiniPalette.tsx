import React from "react";
import "./styles/MiniPalette.scss";

interface Color {
  name: string;
  color: string;
}

interface MiniPaletteProps {
  paletteName: string;
  emoji: string;
  colors: Color[];
}

const MiniPalette: React.FC<MiniPaletteProps> = ({ paletteName, emoji, colors }) => {
  const miniColorBoxes = colors.map((color) => (
    <div
      className="miniColor"
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));

  return (
    <div className="miniPaletteRoot">
      <div className="miniPaletteColors">{miniColorBoxes}</div>
      <h5 className="miniPaletteTitle">
        {paletteName} <span className="miniPaletteEmoji">{emoji}</span>
      </h5>
    </div>
  );
};

export default MiniPalette;
