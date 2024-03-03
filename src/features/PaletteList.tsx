import React from "react";
import "./styles/PaletteList.scss";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";

interface Color {
  name: string;
  color: string;
}

interface Palette {
  id: string;
  paletteName: string;
  emoji: string;
  colors: Color[];
}

interface PaletteListProps {
  palettes: Palette[];
}

const PaletteList: React.FC<PaletteListProps> = ({ palettes }) => {
  return (
    <div className="paletteListRoot">
      <div className="paletteListContainer">
        <nav className="paletteListNav">
          <h1>React Colors</h1>
          <Link to='/palette/new'>Create Palette</Link>
        </nav>
        <div className="palettes">
          {palettes.map((palette) => (
            <Link to={`/palette/${palette.id}`} key={palette.id}>
              <MiniPalette
                paletteName={palette.paletteName}
                colors={palette.colors}
                emoji={palette.emoji}
                key={palette.id}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteList;
