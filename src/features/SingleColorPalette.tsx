import { Component } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "./styles/Palette.scss";
import "./styles/ColorBox.scss";

interface Color {
  name: string;
  color: string;
  hex: string;
}

// @@TODO: Define the Palette interface somewhere else (currently duplicating)
// See seedColors.ts for the original definition
// @@TODO: This needs to be cleaned in the future.
interface Palette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: Color[];
}

interface SingleColorPaletteProps {
  palette: Palette;
  colorId: string | undefined;
}
class SingleColorPalette extends Component<SingleColorPaletteProps> {
  private _shades: Color[];

  constructor(props: SingleColorPaletteProps) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId!);
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeFormat(val) {
    this.setState({ format: val });
  }

  gatherShades(palette: Palette, colorToFilterBy: string) {
    let shades: Color[] = [];
    let allColors = palette.colors;

    // Flatten the array of arrays
    const flattenedColors = Object.values(allColors).flat();

    for (let color of flattenedColors) {
      if (color.name.startsWith(colorToFilterBy)) {
        shades.push(color);
      }
    }
    console.log(shades);

    // get rid of the first color (50) and return the rest
    return shades.slice(1);
  }

  render() {
    const { paletteName, emoji, id } = this.props.palette;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        background={color.hex}
        key={color.name}
        name={color.name}
        showLink={false}
      />
    ));

    return (
      <div className="singleColorPalette palette">
        <Navbar
          handleChange={this.changeFormat}
          showingAllColors={false}
          level={0}
          changeLevel={() => {}}
        />

        <div className="paletteColors">
          {colorBoxes}
          <div className="go-back ColorBox">
            <Link to={`/palette/${id}`} className="back-button">
              GO BACK
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default SingleColorPalette;
