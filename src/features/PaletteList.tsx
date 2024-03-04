import React, { useState, createRef } from "react";
import "./styles/PaletteList.scss";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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

interface Color {
  name: string;
  color: string;
}

interface Palette {
  id: string;
  paletteName: string;
  emoji: string;
  colors: Color[];
}

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
      <div className="paletteListContainer">
        <nav className="paletteListNav">
          <h1 className="paletteListHeading">React Colors</h1>
          <Link to="/palette/new" className="paletteListNew">
            Create Palette
          </Link>
        </nav>
        <TransitionGroup className="palettes">
          {palettes.map((palette) => {
            const itemRef = createRef<HTMLDivElement>();
            return (
              // <BackgroundGradient>
                <CSSTransition
                  key={palette.id}
                  timeout={500}
                  classNames="fade"
                  nodeRef={itemRef}
                >
                  <div ref={itemRef}>
                    <BackgroundGradient>
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
              // </BackgroundGradient>
            );
          })}
        </TransitionGroup>
      </div>
      <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title">
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
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
      </Dialog>
    </div>
  );
};

export default PaletteList;
