import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "rc-slider/assets/index.css";
import "./styles/Palette.scss";
import Navbar from "./Navbar";

export default class Palette extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    // colors are being outputted as an object, so we need to convert it to an array
    const colorBoxes = colors[level].map((color) => (
      <ColorBox key={color.id} background={color.hex} name={color.name} />
    ));

    return (
      <>
        <div className="Palette">

          <Navbar level={level} changeLevel={this.changeLevel} />
          <div className="Palette-colors">{colorBoxes}</div>
          {/* footer eventually */}
        </div>
      </>
    );
  }
}
