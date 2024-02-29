import React, { Component } from "react";
import MiniPalette from "./MiniPalette";

interface Palette {
  id: string;
  paletteName: string;
  emoji: string;
}

interface PaletteListProps {
  palettes: Palette[];
}

class PaletteList extends Component<PaletteListProps> {
  render() {
    const { palettes } = this.props;

    return (
      <div>
        <h1>React Colors</h1>
        {palettes.map((palette) => (
          <MiniPalette paletteName={palette.paletteName} emoji={palette.emoji} key={palette.id} />
        ))}
      </div>
    );
  }
}

export default PaletteList;
