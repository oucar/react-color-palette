import React, { useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography, AppBar, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "./styles/PaletteFormNav.scss";

interface PaletteFormNavProps {
  palettes: any[];
  open: boolean;
  handleDrawerOpen: () => void;
  newPaletteName: string;
  setNewPaletteName: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (name: string) => void;
  drawerWidth: number;
}

const PaletteFormNav: React.FC<PaletteFormNavProps> = (props) => {
  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  }, [props.palettes]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setNewPaletteName(e.target.value);
  };

  const { open, handleDrawerOpen, newPaletteName, handleSubmit } = props;

  return (
    <Box className="PaletteFormNav">
      <AppBar position="fixed" className={`appBar ${open && "appBarShift"}`}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className={`${open && "shiftNavbarText"}`}>
            Create New Palette
          </Typography>
        </Toolbar>
        <div className="PFNav-navBtns">
          <ValidatorForm
            autoComplete="off"
            onSubmit={() => handleSubmit(newPaletteName)}
            className="innerForm"
          >
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={handleChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter a Palette Name", "Name is already taken"]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
          <Link to="/">
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </Box>
  );
};

export default PaletteFormNav;
