import React from "react";

interface PaletteFooterProps {
  paletteName: string;
  emoji: string;
}

const PaletteFooter: React.FC<PaletteFooterProps> = ({ paletteName, emoji }) => {
  return (
    <footer className="Palette-footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  );
};

export default PaletteFooter;
