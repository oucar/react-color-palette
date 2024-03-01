import React, { Component, ChangeEvent } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./styles/Navbar.scss";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface NavbarProps {
  level: number;
  changeLevel: (value: number | number[]) => void;
  handleChange: (value: string) => void;
  showingAllColors: boolean;
}

interface NavbarState {
  format: string;
  prevFormat: string;
  open: boolean;
}

class Navbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = { format: "hex", prevFormat: "hex", open: false };
    this.handleFormatChange = this.handleFormatChange.bind(this);
  }

  handleFormatChange = (e) => {
    const newFormat = e.target.value;
    const { format } = this.state;

    if (newFormat !== format) {
      toast.success(`Format changed to ${newFormat.toUpperCase()}`, {
        position: "bottom-right",
        theme: "light",
      });

      this.setState({
        format: newFormat,
        prevFormat: format,
      });
    } else {
      // this should technically never happen
      toast.error(`Format already set to ${newFormat}`);
    }
  };

  render() {
    const { level, changeLevel, showingAllColors } = this.props;
    const { format } = this.state;

    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">React Colors</Link>
        </div>

        {showingAllColors && (
        <div className="slider-container">
          <div className='slider-container'>
            <span>Level: {level}</span>
            <div className='slider'>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onChangeComplete={changeLevel}
              />
            </div>
          </div>
        </div>
        )}

        <div className="select-container">
          <Select
            value={format.toLowerCase()}
            onChange={this.handleFormatChange}
          >
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>
        <ToastContainer />
      </header>
    );
  }
}

export default Navbar;
