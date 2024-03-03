import React from "react";
import "./styles/DraggableColorBox.scss";
import DeleteIcon from "@mui/icons-material/Delete";

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
  return (
    <div className="draggableColorBoxRoot" style={{ backgroundColor: color }}>
      <div className="DCB-boxContent">
        <span>{name}</span>
        <DeleteIcon className="DCB-deleteIcon" onClick={handleClick} />
      </div>
    </div>
  );
};

export default DraggableColorBox;
