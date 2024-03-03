import React, { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import PaletteList from "./features/PaletteList";
import NewPaletteForm from "./features/NewPaletteForm";
import Palette from "./features/Palette";
import SingleColorPalette from "./features/SingleColorPalette";
import { seedColors } from "./app/common/seedColors";
import { generatePalette } from "./app/common/colorHelpers";

export default function App() {
  const [palettes, setPalettes] = useState(seedColors);

  const findPalette = (id) => {
    return palettes.find((palette) => palette.id === id);
  };

  const PaletteWrapper = () => {
    const { id } = useParams();
    const palette = generatePalette(findPalette(id));
    return <Palette palette={palette} />;
  };

  const SingleColorWrapper = () => {
    const { paletteId, colorId } = useParams();
    const palette = generatePalette(findPalette(paletteId));
    return <SingleColorPalette palette={palette} colorId={colorId} />;
  };

  const savePalette = (newPalette) => {
    setPalettes(palettes.concat(newPalette));
  };

  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<PaletteList palettes={palettes} />} />
        <Route
          path="/palette/new"
          element={
            <NewPaletteForm
                savePalette={savePalette}
                palettes={palettes}
            />
        }
        />
        <Route path="/palette/:id" element={<PaletteWrapper />} />
        <Route
          path="/palette/:paletteId/:colorId"
          element={<SingleColorWrapper />}
        />
      </Routes>
    </div>
  );
}
