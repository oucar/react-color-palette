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
  handleChange: (value: string | number) => void;
  showingAllColors: boolean;
}

interface NavbarState {
  format: string;
  open: boolean;
}

class Navbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = { format: "hex", open: false };
  }

  render() {
    const { level, changeLevel, handleChange, showingAllColors } = this.props;
    const { format } = this.state;

    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">React Colors</Link>
        </div>

        {showingAllColors && (
          <div className="slider-container">
            <div className="slider-container">
              <span>Level: {level}</span>
              <div className="slider">
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
            value={format}
            onChange={(e) => {
              this.setState({ format: e.target.value });
              handleChange(e.target.value);
            }}
          >
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>
        <ToastContainer limit={6} />
      </header>
    );
  }
}

export default Navbar;
