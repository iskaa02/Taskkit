import { extendTheme } from "native-base";
import { listThemes } from "./listThemes";

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};
export const DARK_MODE = {
  background: "#131313",
  surface: "#323232",
  em: {
    1: "#ffff",
    2: "#eaeaea",
    3: "#ababab",
    4: "#787878",
    5: "#343434",
    10: "#000",
  },
};
export const LIGHT_MODE = {
  background: "#f1f1f1",
  surface: "#fff",
  em: {
    1: "#000",
    2: "#343434",
    3: "#787878",
    4: "#ababab",
    5: "#eaeaea",
    10: "#fff",
  },
};
const theme = extendTheme({
  colors: {
    ...LIGHT_MODE,
    ...listThemes,
  },
  components: {
    Text: {
      fontSize: 16,
    },
  },
  config,
});
type CustomThemeType = typeof theme;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}

export default theme;
