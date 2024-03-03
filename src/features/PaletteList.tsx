import React from "react";
import "./styles/PaletteList.scss";
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

interface Color {
  name: string;
  color: string;
}

interface Palette {
  id: string;
  paletteName: string;
  emoji: string;
  colors: Color[];
}

interface PaletteListProps {
  palettes: Palette[];
  deletePalette: (id: string) => void;
}

const PaletteList: React.FC<PaletteListProps> = ({
  palettes,
  deletePalette,
}) => {
  return (
    <div className="paletteListRoot">
      <div className="paletteListContainer">
        <nav className="paletteListNav">
          <h1 className="paletteListHeading">React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className="palettes">
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} timeout={500} classNames="fade">
              <MiniPalette
                {...palette}
                key={palette.id}
                id={palette.id}
                handleDelete={deletePalette}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default PaletteList;
