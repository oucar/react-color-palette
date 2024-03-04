import React from "react";
import "./styles/DraggableColorBox.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import chroma from "chroma-js";

interface DraggableColorBoxProps {
  color: string;
  name: string;
  handleClick: any;
  index: number;
}

const DraggableColorBox: React.FC<DraggableColorBoxProps> = ({
  color,
  name,
  handleClick,
}) => {
  const isDarkColor = chroma(color).luminance() <= 0.08;

  return (
    <div className="draggableColorBoxRoot" style={{ backgroundColor: color }}>
        <div className="DCB-boxContent">
          <span className={isDarkColor ? "lightText" : ""}>{name}</span>
          <DeleteIcon className="DCB-deleteIcon" onClick={handleClick} />
        </div>
    </div>
  );
};

export default DraggableColorBox;
