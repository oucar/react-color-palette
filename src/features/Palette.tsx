import React, { useState, useEffect } from "react";
import ColorBox from "./ColorBox";
import "rc-slider/assets/index.css";
import "./styles/Palette.scss";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { toast } from "react-toastify";

interface PaletteProps {
  palette: {
    colors: Array<{ name: string; hex: string; id: string }[]>;
    paletteName: string;
    id: string;
    emoji: string;
  };
}

// React Functional Component with Palette
const Palette: React.FC<PaletteProps> = ({ palette }) => {
  const [level, setLevel] = useState<number>(500);
  const [format, setFormat] = useState<string>("hex");
  const [showingAllColors] = useState<boolean>(true);

  const changeLevel = (newLevel: number | number[]) => {
    if (typeof newLevel === "number") {
      setLevel(newLevel);
    } else if (Array.isArray(newLevel) && newLevel.length > 0) {
      // Handle the case when an array of numbers is passed (e.g., from Slider component)
      setLevel(newLevel[0]); // For simplicity, just use the first value in the array
    }
  };

  const changeFormat = (val: string | number) => {
    if (val === format) {
      toast.error(`Format already set to ${val}`, {
        position: "bottom-right",
        theme: "light",
      });
    } else {
      setFormat(val as string);
      toast.success(`Format changed to ${val}`, {
        position: "bottom-right",
        theme: "light",
      });
    }
  };

  // colors are being outputted as an object, so we need to convert it to an array
  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      id={color.id}
      paletteId={palette.id}
      showLink
    />
  ));

  return (
    <div className="palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        handleChange={(value) => changeFormat(value as string)}
        showingAllColors={showingAllColors}
      />
      <div className="paletteColors">{colorBoxes}</div>

      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
};

export default Palette;
