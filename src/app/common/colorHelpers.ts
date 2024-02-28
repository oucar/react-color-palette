import chroma from "chroma-js";

interface ColorInfo {
  name: string;
  id: string;
  hex: string;
  rgb: string;
  rgba: string;
}

interface PaletteColor {
  [level: number]: ColorInfo[];
}

interface Palette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: PaletteColor;
}

const levels: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const generatePalette = (starterPalette: Palette): Palette => {
  let newPalette: Palette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {},
  };

  for (let level of levels) {
    newPalette.colors[level] = [];
  }

  // Use Object.entries to iterate over numeric keys and values
  for (let [level, colorInfos] of Object.entries(starterPalette.colors)) {
    let scale = getScale(colorInfos[0].hex, 10).reverse();

    for (let i in scale) {
      newPalette.colors[parseInt(level)].push({
        name: `${colorInfos[0].name} ${levels[i]}`,
        id: colorInfos[0].name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgba", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }

  return newPalette;
};

const getRange = (hexColor: string): string[] => {
  const end = "#fff";
  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    end,
  ];
};

const getScale = (hexColor: string, numberOfColors: number): string[] => {
  return chroma
    .scale(getRange(hexColor))
    .mode("lab")
    .colors(numberOfColors);
};

export { generatePalette };
