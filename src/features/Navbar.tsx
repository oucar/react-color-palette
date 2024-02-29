import React, { Component, ChangeEvent } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import "./styles/Navbar.scss";

interface NavbarProps {
  level: number;
  changeLevel: (value: number | number[]) => void;
  handleChange: (value: string) => void;
}

interface NavbarState {
  format: string;
}

class Navbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = { format: "hex" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: SelectChangeEvent<string>) {
    const selectedFormat = e.target.value;
    this.setState({ format: selectedFormat });
    this.props.handleChange(selectedFormat);
  }

  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;

    return (
      <header className="Navbar">
        <div className="logo">
          <a href="#">React Colors</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onChangeComplete={(value: number | number[]) =>
                changeLevel(value)
              }
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}

export default Navbar;
