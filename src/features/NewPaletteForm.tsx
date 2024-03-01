import React, { Component, ChangeEvent } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker, ColorResult } from "react-color";
import { Typography } from "@mui/material";
import "./styles/NewPaletteForm.scss";

const drawerWidth = 400;

interface NewPaletteFormProps {}

interface NewPaletteFormState {
  open: boolean;
  currentColor: string;
  colors: string[];
}

class NewPaletteForm extends Component<
  NewPaletteFormProps,
  NewPaletteFormState
> {
  constructor(props: NewPaletteFormProps) {
    super(props);
    this.state = {
      open: false,
      currentColor: "teal",
      colors: [],
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = (newColor: ColorResult) => {
    this.setState({ currentColor: newColor.hex });
  };

  addNewColor = () => {
    this.setState((prevState) => ({
      colors: [...prevState.colors, prevState.currentColor],
    }));
  };

  render() {
    const { open, currentColor, colors } = this.state;

    return (
      <>
      <div>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={this.handleDrawerOpen}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          className="drawer"
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          <div>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button variant="contained" color="secondary">
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addNewColor}
            >
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={this.updateCurrentColor}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: this.state.currentColor }}
            onClick={this.addNewColor}
          >
            Add Color
          </Button>
        </Drawer>
      </div>
      <div>
          {colors.map((color) => (
            <div key={color} style={{ backgroundColor: color, height: "50px" }}>
              {color}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default NewPaletteForm;
