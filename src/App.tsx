import { useEffect, useState } from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import PaletteList from "./features/PaletteList";
import NewPaletteForm from "./features/NewPaletteForm";
import Palette from "./features/Palette";
import SingleColorPalette from "./features/SingleColorPalette";
import { seedColors } from "./app/common/seedColors";
import { generatePalette } from "./app/common/colorHelpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./features/styles/App.scss";
import Page from "./features/Page";

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
  const location = useLocation();

  const savedPalettesRaw = window.localStorage.getItem("palettes");
  const savedPalettes = savedPalettesRaw
    ? JSON.parse(savedPalettesRaw)
    : seedColors;

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
    <TransitionGroup className="App" location={location}>
      <CSSTransition key={location.key} classNames="page" timeout={500}>
        <Routes location={location}>
          <Route
            index
            path="/"
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
          <Route
            path="/palette/new"
            element={
              <Page>
                <NewPaletteForm savePalette={savePalette} palettes={palettes} />
              </Page>
            }
          />
          <Route
            path="/palette/:id"
            element={
              <Page>
                <PaletteWrapper />
              </Page>
            }
          />
          <Route
            path="/palette/:paletteId/:colorId"
            element={
              <Page>
                <SingleColorWrapper />
              </Page>
            }
          />
          {/* @@TODO: Implement cool 404 page */}
          <Route
            path="*"
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
