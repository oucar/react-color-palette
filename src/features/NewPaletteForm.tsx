import React, { Component, ChangeEvent } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker, ColorResult } from "react-color";
import { Typography, AppBar, Toolbar } from "@mui/material";
import DraggableColorBox from "./DraggableColorBox";
import "./styles/NewPaletteForm.scss";


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
      open: true,
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
        <div className="newPaletteFormRoot">
          <AppBar
            position="fixed"
            className={`appBar ${open && "appBarShift"}`}
          >
            <Toolbar >
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className="menuButton"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap className={`${open && "drawerTypo"}`}>
                Persistent drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className="drawer"
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: "drawerPaper",
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
              color={currentColor}
              onChangeComplete={this.updateCurrentColor}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: currentColor }}
              onClick={this.addNewColor}
            >
              Add Color
            </Button>
          </Drawer>
          <main className={`content ${open && "contentShift"}`}>
            <div className="drawerHeader" />
            {colors.map((color) => (
              <DraggableColorBox key={color} color={color} />
            ))}
          </main>
        </div>
      </>
    );
  }
}

export default NewPaletteForm;
