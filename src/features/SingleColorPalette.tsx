import React, { Component } from "react";
import ColorBox from "./ColorBox";

interface Color {
  name: string;
  color: string;
}

// @@TODO: Define the Palette interface somewhere else (currently duplicating)
// See seedColors.ts for the original definition
interface Palette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: Color[];
}

interface SingleColorPaletteProps {
  palette: Palette;
  colorId: string | undefined;
}
class SingleColorPalette extends Component<SingleColorPaletteProps> {
  private _shades: Color[];

  constructor(props: SingleColorPaletteProps) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId!);
  }

  gatherShades(palette: Palette, colorToFilterBy: string) {
    let shades: Color[] = [];
    let allColors = palette.colors;
  
    // Check if allColors is an array
    if (Array.isArray(allColors)) {
      // Using find to get the color with the specified name
      const foundColor = allColors.find((color) => color.name === colorToFilterBy);
  
      if (foundColor) {
        shades = [foundColor];
      }
    }
  
    return shades;
  }
  render() {
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color.color}
        showLink={false}
      />
    ));

    return (
      <div className="Palette">
        <h1>Single Color Palette</h1>
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}

export default SingleColorPalette;
