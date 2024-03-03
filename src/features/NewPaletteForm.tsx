import React, { Component, ChangeEvent, useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker, ColorResult } from "react-color";
import { Typography, AppBar, Toolbar } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./styles/NewPaletteForm.scss";
import { useNavigate } from "react-router-dom";
import DraggableColorList from "./DraggableColorList";

// @TODO: Add the Color interface somewhere else
interface Color {
  color: string;
  name: string;
}

// interface NewPaletteFormProps {
//   savePalette: any;
// }
// interface NewPaletteFormState {
//   open: boolean;
//   currentColor: string;
//   colors: Color[];
//   newName: string;
// }

function NewPaletteForm(props) {
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("#EF5959");
  const [newColorName, setNewColorName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", () => {
      return colors.every(
        ({ color }) => color.toLowerCase() !== currentColor.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const handleChangeComplete = (color) => setCurrentColor(color.hex);

  const addNewColor = (e) => {
    e.preventDefault();
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    setColors([...colors, newColor]);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
    props.savePalette(newPalette);
    navigate("/");
  };

  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  return (
    <>
      <div className="newPaletteFormRoot">
        <AppBar position="fixed" className={`appBar ${open && "appBarShift"}`}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
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
            <ValidatorForm autoComplete="off" onSubmit={handleSubmit}>
              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={(e) => setNewPaletteName(e.target.value)}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Enter a Palette Name",
                  "Name is already taken",
                ]}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>
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
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button variant="contained" color="secondary">
              Clear Palette
            </Button>
            <Button variant="contained" color="primary" onClick={addNewColor}>
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={currentColor}
            onChangeComplete={handleChangeComplete}
          />
          <ValidatorForm onSubmit={addNewColor}>
            <TextValidator
              value={newColorName}
              name="newColorName"
              onChange={(e) => setNewColorName(e.target.value)}
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
              style={{ backgroundColor: currentColor }}
            >
              Add Color
            </Button>
          </ValidatorForm>
        </Drawer>
        <main className={`content ${open && "contentShift"}`}>
          <div className="drawerHeader" />
          <DraggableColorList
            colors={colors}
            setColors={setColors}
            removeColor={removeColor}
          />
        </main>
      </div>
    </>
  );
}

export default NewPaletteForm;
