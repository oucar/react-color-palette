import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./styles/Palette.scss";

export default class Palette extends Component<any, any> {
  render() {
    const colorBoxes = this.props.colors.map((color) => (
      <ColorBox background={color.color} name={color.name} />
    ));
    return (
      <>
        <div className="Palette">
          {/* Navbar goes here */}
          <div className="Palette-colors">{colorBoxes}</div>
          {/* footer eventually */}
        </div>
      </>
    );
  }
}
