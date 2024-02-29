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

const findPalette = (id) => palettes.find((palette) => palette.id === id);

const PaletteWrapper = () => {
  const { id } = useParams();
  const palette = generatePalette(findPalette(id));
  return <Palette palette={palette} />;
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        Component={(routeProps) => (
          <PaletteList palettes={palettes} {...routeProps} history={[]} />
        )}
      />

      <Route path="/palette/:id" element={<PaletteWrapper />} />

      <Route
        path="/palette/:paletteId/:colorId"
        Component={() => <h1>SINGLE COLOR PAGE!</h1>}
      />
    </Routes>
  );
}

export default App;
