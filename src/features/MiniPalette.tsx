import React, { Component } from "react";
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

// <MiniPaletteProps> is the type of the props object
// <any> is the type of the state object
class MiniPalette extends Component<MiniPaletteProps, any> {
  constructor(props) {
    super(props);
    this.state = { paletteName: "", emoji: "", colors: [] };
  }

  render() {
    const { paletteName, emoji, colors } = this.props;
    // console.log(this.props);

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
  }
}

export default MiniPalette;
