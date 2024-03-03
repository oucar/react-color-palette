import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { ReactSortable, ItemInterface } from "react-sortablejs";

interface Color {
    color: string;
    name: string;
  }

  
interface DraggableColorListProps {
    colors: Color[]; 
    setColors: React.Dispatch<React.SetStateAction<Color[]>>;
    removeColor: (colorName: string) => void;
}

const DraggableColorList: React.FC<DraggableColorListProps> = ({
    colors,
    setColors,
    removeColor,
}) => {
    return (
        <ReactSortable
            list={colors.map((color, index) => ({ ...color, id: index.toString() }))} // Added 'id' property
            setList={setColors}
            style={{ height: "100%" }}
        >
            {colors.map((color, i) => (
                <DraggableColorBox
                    key={color.name}
                    index={i}
                    color={color.color}
                    name={color.name}
                    handleClick={() => removeColor(color.name)}
                />
            ))}
        </ReactSortable>
    );
};

export default DraggableColorList;