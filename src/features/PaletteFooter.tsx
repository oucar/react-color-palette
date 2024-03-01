import React, { Component } from "react";

interface PaletteFooterProps {
  paletteName: string;
  emoji: string;
}

class PaletteFooter extends Component<PaletteFooterProps> {
  render() {
    const { paletteName, emoji } = this.props;

    return (
      <footer className="Palette-footer">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </footer>
    );
  }
}

export default PaletteFooter;
