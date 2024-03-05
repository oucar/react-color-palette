import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography, AppBar, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import "./styles/PaletteFormNav.scss";
import PaletteMetaForm from "./PaletteMetaForm";
import { AddToPhotos, Clear } from "@mui/icons-material";
import { GlowingBorder } from "./GlowingBorder";
import {Palette} from "../app/models/palette";


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
            <AddToPhotos />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={`${open && "shiftNavbarText"}`}
          >
            Create a New Palette
          </Typography>
        </Toolbar>
        <div className="PFNav-navBtns">


          <Link to="/">
            <IconButton aria-label="back" color="error">
              <Clear />
            </IconButton>{" "}
          </Link>

          <GlowingBorder
            borderRadius="1.75rem"
            className="bg-slate-900 text-white"
            onClick={showForm}
          >
            Create
          </GlowingBorder>
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
