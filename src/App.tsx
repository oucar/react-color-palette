import Palette from "./features/Palette";
import { palettes } from "./app/common/seedColors";
import { generatePalette } from "./app/common/colorHelpers";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import PaletteList from "./features/PaletteList";
import SingleColorPalette from "./features/SingleColorPalette";

const findPalette = (id) => palettes.find((palette) => palette.id === id);

const PaletteWrapper = () => {
  const { id } = useParams();
  const palette = generatePalette(findPalette(id));
  return <Palette palette={palette} />;
};

const SingleColorPaletteWrapper = () => {
  const { paletteId, colorId } = useParams();
  const palette = generatePalette(findPalette(paletteId));
  return <SingleColorPalette palette={palette} colorId={colorId} />;
};

function App() {
  return (
    <Routes>
      {/* Home Route */}
      <Route
        path="/"
        Component={(routeProps) => (
          <PaletteList palettes={palettes} {...routeProps} history={[]} />
        )}
      />

      {/* Palette Route */}
      <Route path="/palette/:id" element={<PaletteWrapper />} />

      {/* Individual Color Route */}
      <Route
        path="/palette/:paletteId/:colorId"
        Component={() => <SingleColorPaletteWrapper />}
      />
    </Routes>
  );
}

export default App;
