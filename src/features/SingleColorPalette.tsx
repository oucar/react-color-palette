import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "./styles/Palette.scss";
import "./styles/ColorBox.scss";
import {Color} from "../app/models/color";
import {Palette} from "../app/models/palette";

interface SingleColorPaletteProps {
  palette: Palette;
  colorId: string | undefined;
}

const SingleColorPalette: React.FC<SingleColorPaletteProps> = ({ palette }) => {
  const [shades, setShades] = useState<Color[]>([]);
  const [format, setFormat] = useState<string>("hex");

  const { colorId } = useParams<{ colorId: string }>();

  useEffect(() => {
    const gatherShades = () => {
      let shades: Color[] = [];
      let allColors = palette.colors;

      // Flatten the array of arrays
      const flattenedColors = Object.values(allColors).flat();

      for (let color of flattenedColors) {
        if (color.name.toLowerCase().startsWith(colorId!.toLowerCase())) {
          shades.push(color);
        }
      }

      // get rid of the first color (50) and return the rest
      setShades(shades.slice(1));
    };

    gatherShades();
  }, [colorId, palette.colors]);

  const changeFormat = (val: string | number) => {
    setFormat(val as string);
  };

  const colorBoxes = shades.map((color) => (
    <ColorBox
      background={color[format]}
      name={color.name}
      paletteId={palette.id}
      id={palette.id}
      key={color.name}
      showLink={false}
    />
  ));

  return (
    <div className="singleColorPalette palette">
      <Navbar
        handleChange={changeFormat}
        showingAllColors={false}
        level={0}
        changeLevel={() => {}}
      />

      <div className="paletteColors">
        {colorBoxes}
        <div className="colorBox goBack">
          <Link to={`/palette/${palette.id}`} className="backButton">
            GO BACK
          </Link>
        </div>
      </div>
      <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
    </div>
  );
};

export default SingleColorPalette;
