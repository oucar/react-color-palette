import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "rc-slider/assets/index.css";
import "./styles/Palette.scss";
import Navbar from "./Navbar";

class Palette extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  changeFormat(val) {
    this.setState({ format: val });
  }
  render() {
    const { colors, paletteName, emoji } = this.props.palette;
    const { level, format } = this.state;
    // colors are being outputted as an object, so we need to convert it to an array
    const colorBoxes = colors[level].map((color) => (
      <ColorBox background={color[format]} name={color.name} key={color.id} />
    ));

    return (
      <div className="palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />{" "}
        <div className="paletteColors">{colorBoxes}</div>
        <footer className="paletteFooter">
          {paletteName}
          <span className="paletteEmoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}

export default Palette;
