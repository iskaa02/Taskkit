import { storage } from "@/db/storage";
import { extendTheme, StorageManager } from "native-base";
import { Appearance } from "react-native";

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
  background: "#fafafa",
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
  colors: LIGHT_MODE,
  components: {
    Text: {
      fontSize: 16,
    },
    Input: {
      _focus: {
        borderColor: "blue.500",
      },
      baseStyle: {
        _light: {
          selectionColor: "rgba(0,0,0,0.4)",
        },
        _dark: {
          selectionColor: "rgba(255,255,255,0.4)",
        },
      },
    },
  },
  config,
});
type CustomThemeType = typeof theme;

declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}

export default theme;
export const colorModeManager: StorageManager = {
  get: async () => {
    const colorMode = storage.getString("@color-mode");
    if (colorMode === "dark" || colorMode === "light") return colorMode;
    return Appearance.getColorScheme();
  },
  set: async value => {
    if (value !== "dark" && value !== "light") {
      storage.set("@color-mode", "system-default");
      return;
    }
    storage.set("@color-mode", value);
  },
};
