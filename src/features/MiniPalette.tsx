import React, { Component } from "react";
import "./styles/MiniPalette.scss";

interface MiniPaletteProps {
  paletteName: string;
  emoji: string;
}

// <MiniPaletteProps> is the type of the props object
// <any> is the type of the state object
class MiniPalette extends Component<MiniPaletteProps, any> {
  constructor(props) {
    super(props);
    this.state = { paletteName: "", emoji: "" };
  }

  render() {
    const { paletteName, emoji } = this.props;
    return (
        <div className="root">
        <div className="colors" />
        <h5 className="title">
          {paletteName} <span className="emoji">{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default MiniPalette;
