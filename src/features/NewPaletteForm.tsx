import React, { Component, ChangeEvent } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker, ColorResult } from "react-color";
import { Typography, AppBar, Toolbar } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorBox from "./DraggableColorBox";
import "./styles/NewPaletteForm.scss";

// @TODO: Add the Color interface somewhere else
interface Color {
  color: string;
  name: string;
}

interface NewPaletteFormProps {}
interface NewPaletteFormState {
  open: boolean;
  currentColor: string;
  colors: Color[];
  newName: string;
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
      newName: "",
      colors: [{ color: "blue", name: "blue" }],
    };
    
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      this.state.colors.every(({ color }) => color !== this.state.currentColor)
    );
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
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newName,
    };
    this.setState({ colors: [...this.state.colors, newColor], newName: "" });
  };

  handleChange = (evt) => {
    this.setState({ newName: evt.target.value });
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
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className="menuButton"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                className={`${open && "drawerTypo"}`}
              >
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

            <ValidatorForm onSubmit={this.addNewColor}>
              <TextValidator
                value={this.state.newName}
                onChange={this.handleChange}
                validators={["required", "isColorNameUnique", "isColorUnique"]}
                errorMessages={[
                  "Enter a color name",
                  "Color name must be unique",
                  "Color already used!",
                ]}
              />
              <Button
                variant="contained"
                type="submit"
                color="primary"
                style={{ backgroundColor: this.state.currentColor }}
              >
                Add Color
              </Button>
            </ValidatorForm>
          </Drawer>
          <main className={`content ${open && "contentShift"}`}>
            <div className="drawerHeader" />
            {colors.map((color) => (
              <DraggableColorBox color={color.color} name={color.name} />
            ))}
          </main>
        </div>
      </>
    );
  }
}

export default NewPaletteForm;
