import oc from "open-color";
import { Merge } from "./utility-types";

import * as radix from "@radix-ui/colors";

export type Color = keyof oc | "transparent";
export type ColorTuple = [string, string, string, string, string];
export type ColorPalette = Merge<
  Record<Color | "slate", ColorTuple>,
  { black: string; white: string; transparent: string }
>;
// used general type instead of specific type (ColorPalette) to support custom colors
export type ColorPaletteCustom = { [key: string]: ColorTuple | string };
export type ColorShadesIndexes = [number, number, number, number, number];

export const MAX_CUSTOM_COLORS_USED_IN_CANVAS = 5;
export const COLORS_PER_ROW = 5;

export const DEFAULT_CHART_COLOR_INDEX = 4;

export const DEFAULT_ELEMENT_STROKE_COLOR_INDEX = 4;
export const DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX = 2;
export const DEFAULT_CANVAS_BACKGROUND_INDEX = 0;
export const DEFAULT_PALETTE_SHADE_INDEXES = [1, 3, 5, 7, 9] as [
  number,
  number,
  number,
  number,
  number,
];

export const getSpecificColorShades = (
  color: Exclude<Color, "transparent" | "white" | "black">,
  indexArr: ColorShadesIndexes,
) => {
  return indexArr.map((index) => oc[color][index]) as ColorTuple;
};

type RadixColor =
  | "amber"
  | "blue"
  | "bronze"
  | "brown"
  | "crimson"
  | "cyan"
  | "gold"
  | "grass"
  | "gray"
  | "green"
  | "indigo"
  | "lime"
  | "mauve"
  | "mint"
  | "olive"
  | "orange"
  | "pink"
  | "plum"
  | "purple"
  | "red"
  | "sage"
  | "sand"
  | "sky"
  | "slate"
  | "teal"
  | "tomato"
  | "violet"
  | "yellow";

export const getRadixColorShades = (
  color: Exclude<RadixColor, "transparent" | "white" | "black">,
  indexArr: ColorShadesIndexes = [3, 5, 7, 9, 11],
) => {
  return indexArr.map(
    // @ts-ignore
    (index) => radix[`${color}`][`${color}${index}`],
  ) as ColorTuple;
};

// ORDER matters for positioning in palette (5x3 grid)
// ready for custom pallets from hosts apps
// just expose the scheme and let them fill it with colors
// we calculate the shades for them
// display the colors in the order they are in the scheme etc.
export const OC_PALETTE = {
  transparent: "transparent",
  black: oc.black,
  white: oc.white,
  // avail colors scheme (open colors)
  red: getSpecificColorShades("red", DEFAULT_PALETTE_SHADE_INDEXES),
  pink: getSpecificColorShades("pink", DEFAULT_PALETTE_SHADE_INDEXES),
  grape: getSpecificColorShades("grape", DEFAULT_PALETTE_SHADE_INDEXES),
  violet: getSpecificColorShades("violet", DEFAULT_PALETTE_SHADE_INDEXES),
  indigo: getSpecificColorShades("indigo", DEFAULT_PALETTE_SHADE_INDEXES),
  gray: getSpecificColorShades("gray", DEFAULT_PALETTE_SHADE_INDEXES),
  blue: getSpecificColorShades("blue", DEFAULT_PALETTE_SHADE_INDEXES),
  cyan: getSpecificColorShades("cyan", DEFAULT_PALETTE_SHADE_INDEXES),
  teal: getSpecificColorShades("teal", DEFAULT_PALETTE_SHADE_INDEXES),
  green: getSpecificColorShades("green", DEFAULT_PALETTE_SHADE_INDEXES),
  lime: getSpecificColorShades("lime", DEFAULT_PALETTE_SHADE_INDEXES),
  yellow: getSpecificColorShades("yellow", DEFAULT_PALETTE_SHADE_INDEXES),
  orange: getSpecificColorShades("orange", DEFAULT_PALETTE_SHADE_INDEXES),

  // radix colors 3,5,7,9,11
  slate: ["#f1f3f5", "#e6e8eb", "#d7dbdf", "#889096", "#687076"],
} as ColorPalette;

export const RADIX_PALETTE = {
  transparent: "transparent",
  black: oc.black,
  white: oc.white,
  // avail colors scheme (open colors)
  sky: getRadixColorShades("sky", [3, 5, 9, 10, 8]),
  blue: getRadixColorShades("blue"),
  purple: getRadixColorShades("purple"),
  // pink: getRadixColorShades("pink"),
  indigo: getRadixColorShades("indigo"),
  crimson: getRadixColorShades("crimson"),
  red: getRadixColorShades("red"),
  // orange: getRadixColorShades("orange"),
  // green: getRadixColorShades("green"),
  grass: getRadixColorShades("grass", [3, 5, 7, 8, 10]),
  lime: getRadixColorShades("lime", [3, 5, 6, 9, 10]),
  yellow: getRadixColorShades("yellow", [3, 5, 6, 9, 10]),
  bronze: getRadixColorShades("bronze"),
  amber: getRadixColorShades("amber", [3, 5, 6, 9, 8]),

  gray: getRadixColorShades("gray"),
  slate: getRadixColorShades("slate"),
} as const;

const getCommonColorsForPalette = () => ({
  // 2nd row
  purple: RADIX_PALETTE.purple,
  indigo: RADIX_PALETTE.indigo,
  blue: RADIX_PALETTE.blue,
  sky: RADIX_PALETTE.sky,
  // pink: RADIX_PALETTE.pink,

  // 3rd row
  // green: RADIX_PALETTE.green,
  grass: RADIX_PALETTE.grass,
  lime: RADIX_PALETTE.lime,
  yellow: RADIX_PALETTE.yellow,
  // orange: RADIX_PALETTE.orange,
  amber: RADIX_PALETTE.amber,
  red: RADIX_PALETTE.red,
  crimson: RADIX_PALETTE.crimson,
});

// !!!MUST BE WITHOUT GRAY, TRANSPARENT AND BLACK!!!
export const getAllColorsSpecificShade = (index: 0 | 1 | 2 | 3 | 4) => [
  // 2nd row
  OC_PALETTE.cyan[index],
  OC_PALETTE.blue[index],
  OC_PALETTE.violet[index],
  OC_PALETTE.grape[index],
  OC_PALETTE.pink[index],

  // 3rd row
  OC_PALETTE.green[index],
  OC_PALETTE.teal[index],
  OC_PALETTE.yellow[index],
  OC_PALETTE.orange[index],
  OC_PALETTE.red[index],
];

// ORDER matters for positioning in quick picker
export const DEFAULT_ELEMENT_STROKE_PICKS = [
  RADIX_PALETTE.black,
  RADIX_PALETTE.red[DEFAULT_ELEMENT_STROKE_COLOR_INDEX],
  RADIX_PALETTE.lime[DEFAULT_ELEMENT_STROKE_COLOR_INDEX],
  RADIX_PALETTE.blue[DEFAULT_ELEMENT_STROKE_COLOR_INDEX],
  RADIX_PALETTE.yellow[DEFAULT_ELEMENT_STROKE_COLOR_INDEX],
] as ColorTuple;

// ORDER matters for positioning in quick picker
export const DEFAULT_ELEMENT_BACKGROUND_PICKS = [
  RADIX_PALETTE.transparent,
  RADIX_PALETTE.red[DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX],
  RADIX_PALETTE.lime[DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX],
  RADIX_PALETTE.blue[DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX],
  RADIX_PALETTE.yellow[DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX],
] as ColorTuple;

// ORDER matters for positioning in quick picker
export const DEFAULT_CANVAS_BACKGROUND_PICKS = [
  RADIX_PALETTE.white,
  RADIX_PALETTE.gray[DEFAULT_CANVAS_BACKGROUND_INDEX],
  RADIX_PALETTE.red[DEFAULT_CANVAS_BACKGROUND_INDEX],
  RADIX_PALETTE.blue[DEFAULT_CANVAS_BACKGROUND_INDEX],
  RADIX_PALETTE.yellow[DEFAULT_CANVAS_BACKGROUND_INDEX],
] as ColorTuple;

export const DEFAULT_ELEMENT_STROKE_COLOR_PALETTE = {
  // 1st row
  transparent: RADIX_PALETTE.transparent,
  white: RADIX_PALETTE.white,
  slate: RADIX_PALETTE.slate,
  // gray: RADIX_PALETTE.gray,
  black: RADIX_PALETTE.black,
  bronze: RADIX_PALETTE.bronze,
  // rest
  ...getCommonColorsForPalette(),
};

// ORDER matters for positioning in pallete (5x3 grid)s
export const DEFAULT_ELEMENT_BACKGROUND_COLOR_PALETTE = {
  transparent: RADIX_PALETTE.transparent,
  white: RADIX_PALETTE.white,
  slate: RADIX_PALETTE.slate,
  // gray: RADIX_PALETTE.gray,
  black: RADIX_PALETTE.black,
  bronze: RADIX_PALETTE.bronze,

  ...getCommonColorsForPalette(),
};

export const DEFAULT_CANVAS_BACKGROUND_COLOR_PALETTE = {
  // 1st row
  white: RADIX_PALETTE.white,
  gray0: RADIX_PALETTE.gray,
  gray1: RADIX_PALETTE.slate,
  // rest
  ...getCommonColorsForPalette(),
};

// console.log(DEFAULT_ELEMENT_BACKGROUND_COLOR_PALETTE);

// export const OC_DEFAULT_ELEMENT_BACKGROUND_COLOR_PALETTE = {
//   slate: OC_PALETTE.slate,
//   gray: OC_PALETTE.gray,
//   violet: OC_PALETTE.violet,
//   grape: OC_PALETTE.grape,
//   blue: OC_PALETTE.blue,
//   cyan: OC_PALETTE.cyan,
//   teal: OC_PALETTE.teal,
//   green: OC_PALETTE.green,
//   yellow: OC_PALETTE.yellow,
//   orange: OC_PALETTE.orange,
//   red: OC_PALETTE.red,
//   pink: OC_PALETTE.pink,
// };

// const generateRectangles = () => {
//   const elements: Record<string, any>[] = [];
//   let rowIdx = 0;
//   for (const color of Object.values(
//     OC_DEFAULT_ELEMENT_BACKGROUND_COLOR_PALETTE,
//   )) {
//     rowIdx++;
//     let shadeIdx = 0;
//     for (const shade of color) {
//       shadeIdx++;
//       elements.push({
//         type: "rectangle",
//         version: 156,
//         versionNonce: 1205271813,
//         isDeleted: false,
//         id: "jBsRlGDQwGI9KNowhnB4z",
//         fillStyle: "solid",
//         strokeWidth: 1,
//         strokeStyle: "solid",
//         roughness: 1,
//         opacity: 100,
//         angle: 0,
//         x: 100 * shadeIdx,
//         y: 100 * rowIdx,
//         strokeColor: "#000000",
//         backgroundColor: shade,
//         width: 100,
//         height: 100,
//         seed: 1945716107,
//         groupIds: [],
//         roundness: { type: 3 },
//         boundElements: null,
//         updated: 1681303657439,
//         link: null,
//         locked: false,
//       });
//     }
//   }

//   return {
//     type: "excalidraw/clipboard",
//     elements,
//     files: {},
//   };
// };

// console.log(generateRectangles());
