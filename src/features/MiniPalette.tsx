import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles/MiniPalette.scss";
import {Color} from "../app/models/color";

interface MiniPaletteProps {
  paletteName: string;
  emoji: string;
  colors: Color[];
  handleDelete: (id: string) => void;
  id: string;
  openDialog: (id: string) => void;
}

const MiniPalette: React.FC<MiniPaletteProps> = ({
  paletteName,
  emoji,
  colors,
  id,
  openDialog,
}) => {
  const deletePaletteDialog = (e) => {
    e.stopPropagation();
    openDialog(id);
  };

  const miniColorBoxes = colors.map((color) => (
    <div
      className="miniColor"
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));

  return (
    <div className="miniPaletteRoot">
      <div className="miniPaletteDelete">
        <DeleteIcon
          className="miniPaletteDeleteIcon"
          onClick={deletePaletteDialog}
        />
      </div>

      <Link to={`/palette/${id}`} key={id}>
        <div className="miniPaletteColors">{miniColorBoxes}</div>
        <h5 className="miniPaletteTitle">
          {paletteName} <span className="miniPaletteEmoji">{emoji}</span>
        </h5>
      </Link>
    </div>
  );
};

// React-memo is used to prevent unnecessary re-renders of the MiniPalette component
export default React.memo(MiniPalette, () => true);
