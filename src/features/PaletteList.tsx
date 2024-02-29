import React, { Component } from "react";
import "./styles/PaletteList.scss";
import MiniPalette from "./MiniPalette";

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

class PaletteList extends Component<PaletteListProps> {
  render() {
    const { palettes } = this.props;

    return (
      <div className="paletteListRoot">
        <div className="paletteListContainer">
          <nav className="paletteListNav">
            <h1>React Colors</h1>
          </nav>
          <div className="palettes">
            {palettes.map((palette) => (
              <MiniPalette
                paletteName={palette.paletteName}
                colors={palette.colors}
                emoji={palette.emoji}
                key={palette.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default PaletteList;
