import React, { useEffect, ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography, AppBar, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./styles/PaletteFormNav.scss";
import PaletteMetaForm from "./PaletteMetaForm";

interface Palette {
  paletteName: string;
  emoji: string;
}

interface PaletteFormNavProps {
  palettes: any[];
  open: boolean;
  handleDrawerOpen: () => void;
  newPaletteName: string;
  setNewPaletteName: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (palette: Palette) => void;
  drawerWidth: number;
}

const PaletteFormNav: React.FC<PaletteFormNavProps> = (props) => {
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => setFormShowing(true);

  const hideForm = () => setFormShowing(false);

  const {
    open,
    handleDrawerOpen,
    newPaletteName,
    setNewPaletteName,
    palettes,
    handleSubmit,
  } = props;

  return (
    <Box className="PaletteFormNav">
      <AppBar
        className="PFN-appBar"
        position="fixed"
        // open={open}
        color="default"
      >
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={`${open && "shiftNavbarText"}`}
          >
            Create New Palette
          </Typography>
        </Toolbar>
        <div className="PFNav-navBtns">
          <Link to="/">
            <Button className="button" variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={showForm}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing ? (
        <PaletteMetaForm
          palettes={palettes}
          newPaletteName={newPaletteName}
          setNewPaletteName={setNewPaletteName}
          handleSubmit={handleSubmit}
          hideForm={hideForm}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default PaletteFormNav;
