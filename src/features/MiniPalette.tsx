import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles/MiniPalette.scss";
import { Link } from "react-router-dom";

interface Color {
  name: string;
  color: string;
}

interface MiniPaletteProps {
  paletteName: string;
  emoji: string;
  colors: Color[];
  handleDelete: (id: string) => void;
  id: string;
}

const MiniPalette: React.FC<MiniPaletteProps> = ({
  paletteName,
  emoji,
  colors,
  id,
  handleDelete,
}) => {

  const deletePalette = (e) => {
    e.stopPropagation();
    handleDelete(id);
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
          onClick={deletePalette}
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

export default MiniPalette;
