import React, { useState, createRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import MiniPalette from "./MiniPalette";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import blue from "@mui/material/colors/blue";
import red from "@mui/material/colors/red";
import { BackgroundGradient } from "./BackgroundGradient";
import "./styles/PaletteList.scss";
import { BackgroundBeams } from "./BackgroundBeams";
import { GlowingBorder } from "./GlowingBorder";
import {Palette} from "../app/models/palette";


interface PaletteListProps {
  palettes: Palette[];
  deletePalette: (id: string) => void;
}

const PaletteList: React.FC<PaletteListProps> = ({
  palettes,
  deletePalette,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [hoveredPaletteId, setHoveredPaletteId] = useState<string | null>(null);

  const openDialog = (id) => {
    setOpenDeleteDialog(true);
    setDeletingId(id);
  };

  const closeDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingId("");
  };

  const handleDelete = () => {
    deletePalette(deletingId);
    closeDialog();
  };

  return (
    <div className="paletteListRoot">
      <BackgroundBeams />
      <div className="paletteListContainer">
        <nav className="paletteListNav">
          <h1 className="paletteListHeading">React Colors</h1>
          <Link to="/palette/new" className="paletteListNew">
            <GlowingBorder
              borderRadius="1.75rem"
              className="bg-slate-900 text-white"
            >
              Create Palette
            </GlowingBorder>
          </Link>
        </nav>
        <TransitionGroup className="palettes">
          {palettes.map((palette) => {
            const itemRef = createRef<HTMLDivElement>();
            return (
              <CSSTransition
                key={palette.id}
                timeout={500}
                classNames="fade"
                nodeRef={itemRef}
              >
                <div
                  ref={itemRef}
                  onMouseEnter={() => setHoveredPaletteId(palette.id)}
                  onMouseLeave={() => setHoveredPaletteId(null)}
                >
                  <BackgroundGradient animate={hoveredPaletteId === palette.id}>
                    <MiniPalette
                      {...palette}
                      key={palette.id}
                      id={palette.id}
                      openDialog={() => openDialog(palette.id)}
                      handleDelete={() => deletePalette(palette.id)}
                    />
                  </BackgroundGradient>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
      <div></div>
      <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title">
        <div className="dialog">
          <DialogTitle id="delete-dialog-title">
            Delete This Palette?
          </DialogTitle>
          <List>
            <ListItem disableGutters>
              <ListItemButton onClick={handleDelete}>
                <ListItemAvatar>
                  <Avatar
                    style={{
                      background: blue[100],
                      color: blue[600],
                    }}
                  >
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Delete" />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters>
              <ListItemButton onClick={closeDialog}>
                <ListItemAvatar>
                  <Avatar
                    style={{
                      background: red[100],
                      color: red[600],
                    }}
                  >
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Cancel" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Dialog>
    </div>
  );
};

export default PaletteList;
