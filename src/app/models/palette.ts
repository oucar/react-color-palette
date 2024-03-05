import { Color } from "./color";

export interface Palette {
    id: string;
    paletteName: string;
    emoji: string;
    colors: Color[];
  }