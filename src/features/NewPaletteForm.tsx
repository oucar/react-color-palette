import React, { Component, ChangeEvent, useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Typography, AppBar, Toolbar } from "@mui/material";
import "./styles/NewPaletteForm.scss";
import { useNavigate } from "react-router-dom";
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

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
  const defaultProps = {
    maxColors: 20,
  };
  const drawerWidth = 350;

  const [open, setOpen] = useState(true);
  const [newPaletteName, setNewPaletteName] = useState("");
  // @@TODO: for testing only. remove later
  const [colors, setColors] = useState<Color[]>(props.palettes[0].colors);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const addNewColor = (newColor) => {
    setColors(colors.concat(newColor));
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
    props.savePalette(newPalette);
    navigate("/");
  };

  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors(colors.concat(randomColor));
  };

  const paletteIsFull = colors.length >= defaultProps.maxColors;

  const { palettes } = props;

  return (
    <>
      <div className="newPaletteFormRoot">
        <PaletteFormNav
          drawerWidth={drawerWidth}
          open={open}
          palettes={palettes}
          handleDrawerOpen={handleDrawerOpen}
          newPaletteName={newPaletteName}
          setNewPaletteName={setNewPaletteName}
          handleSubmit={handleSubmit}
        />
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
          <div className="NPF-container">
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className="NPF-buttons">
              <Button
                variant="contained"
                color="secondary"
                onClick={clearColors}
                className="NPF-button"
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={addRandomColor}
                disabled={paletteIsFull}
                className="NPF-button"
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              colors={colors}
              paletteIsFull={paletteIsFull}
              addNewColor={addNewColor}
            />
          </div>
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
