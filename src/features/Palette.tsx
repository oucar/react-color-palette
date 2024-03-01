import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "rc-slider/assets/index.css";
import "./styles/Palette.scss";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { toast } from "react-toastify";

class Palette extends Component<any, any> {
  // @@TODO: Add interface for all the props
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex", showingAllColors: true };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(val: string | number) {
    let format = this.state.format;

    if (val === format) {
      toast.error(`Format already set to ${val}`, {
        position: "bottom-right",
        theme: "light",
      });
    } else {
      this.setState({ format: val as string });
      toast.success(`Format changed to ${val}`, {
        position: "bottom-right",
        theme: "light",
      });
    }
  }
  render() {
    // @@TODO: Add interface for all the props
    const { colors, paletteName, id, emoji } = this.props.palette;
    const { level, format } = this.state;

    // colors are being outputted as an object, so we need to convert it to an array
    const colorBoxes = colors[level].map((color) => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        id={color.id}
        paletteId={id}
        showLink
      />
    ));

    return (
      <div className="palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={(value) => this.changeFormat(value as string)}
          showingAllColors={this.state.showingAllColors}
        />
        {/* {format} */}
        <div className="paletteColors">{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default Palette;
