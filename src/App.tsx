import Palette from "./features/Palette";
import { palettes } from "./app/common/seedColors";
// import "./App.scss"


function App() {
  return (
    <>
      <Palette {...palettes[2]} />
    </>
  );
}

export default App;
