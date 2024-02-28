import Palette from "./features/Palette";
import { palettes } from "./app/common/seedColors";
import { generatePalette } from "./app/common/colorHelpers";


function App() {
  console.log(generatePalette(palettes[4]));

  return (
    <>
        <Palette palette={generatePalette(palettes[4])} />
    </>
  );
}

export default App;
