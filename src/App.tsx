import Palette from "./features/Palette";
import { palettes } from "./app/common/seedColors";
import { generatePalette } from "./app/common/colorHelpers";


function App() {
  console.log(generatePalette(palettes[2] as any));

  return (
    <>
      <Palette {...palettes[2]} />
    </>
  );
}

export default App;
