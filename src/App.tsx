import Palette from "./features/Palette";
import { palettes } from "./app/common/seedColors";
import { generatePalette } from "./app/common/colorHelpers";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";

const findPalette = id => palettes.find(palette => palette.id === id);

const PaletteWrapper = () => {
  const { id } = useParams();
  const palette = generatePalette(findPalette(id))
  return <Palette palette={palette} />;
};

function App() {
  console.log(generatePalette(palettes[4]));


  return (
      <Routes>
        <Route path="/" Component={() => <h1>PALETTE LIST GOES HERE</h1>} />
        <Route path="/palette/:id" element={<PaletteWrapper />} />
      </Routes>
  );
}

export default App;
