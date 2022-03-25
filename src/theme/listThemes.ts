export type listThemeType = {
  main: string;
  secondary?: string;
};
export const listThemes: { [x: string]: listThemeType } = {
  mint: {
    main: "#BAE2A7",
    secondary: "#2B6735",
  },
  lightBlue: {
    main: "#A7DEE2",
    secondary: "#2B6367",
  },
  pink: {
    main: "#E2A7A7",
    secondary: "#672B2B",
  },
  purple: {
    main: "#AFA7E2",
    secondary: "#332B67",
  },
  givry: {
    main: "#F7D2BF",
    secondary: "#1C0060",
  },
  zest: {
    main: "#E17A2D",
    secondary: "#37003E",
  },
  ocean: {
    main: "#4293FF",
  },
};
export type listThemesEnum =
  | "zest"
  | "ocean"
  | "givry"
  | "purple"
  | "pink"
  | "lightBlue"
  | "mint";
