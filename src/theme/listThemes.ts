export type listThemeType = {
  main: string;
  secondary?: string;
};
export const listThemes: { [x: string]: listThemeType } = {
  mint: {
    main: "#BAE2A7",
    secondary: "#3C904A",
  },
  lightBlue: {
    main: "#A7DEE2",
    secondary: "#3C8B90",
  },
  pink: {
    main: "#E2A7A7",
    secondary: "#903C3C",
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
  purple: {
    main: "#AFA7E2",
    secondary: "#483C90",
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
