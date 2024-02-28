import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./styles/Palette.scss";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onChangeComplete={this.changeLevel}
          />
          {/* Navbar goes here */}
          <div className="Palette-colors">{colorBoxes}</div>
          {/* footer eventually */}
        </div>
      </>
    );
  }
}
