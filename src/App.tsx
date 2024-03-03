import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import PaletteList from "./features/PaletteList";
import NewPaletteForm from "./features/NewPaletteForm";
import Palette from "./features/Palette";
import SingleColorPalette from "./features/SingleColorPalette";
import { seedColors } from "./app/common/seedColors";
import { generatePalette } from "./app/common/colorHelpers";

interface Color {
  name: string;
  color: string;
}

interface Palette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: Color[];
}


export default function App() {
  const savedPalettesRaw = window.localStorage.getItem("palettes");
  const savedPalettes = savedPalettesRaw ? JSON.parse(savedPalettesRaw) : seedColors;
  
  const [palettes, setPalettes] = useState<Palette[]>(savedPalettes);

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

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

  const deletePalette = (id) => {
    setPalettes(palettes.filter((palette) => palette.id !== id));
  };

  return (
    <div className="App">
      <Routes>
        <Route
          index
          path="/"
          element={<PaletteList palettes={palettes} deletePalette={deletePalette} />}

        />
        <Route
          path="/palette/new"
          element={
            <NewPaletteForm savePalette={savePalette} palettes={palettes} />
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
