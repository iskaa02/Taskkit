import { storage } from "@/db/storage";
import { useColorScheme } from "react-native";
import { useColorMode as useColorModeNB } from "native-base";
import { useMMKVString } from "react-native-mmkv";
type colorModeReturnType = {
  setColorMode: (value: "light" | "dark" | "system-default") => void;
  colorMode: "light" | "dark";
  isSystemDefault: boolean;
};
export default function useColorMode(): colorModeReturnType {
  const [colorMode, _] = useMMKVString("@color-mode", storage);
  const { setColorMode } = useColorModeNB();
  const systemColorMode = useColorScheme();
  let res: colorModeReturnType = {
    // @ts-ignore
    colorMode: colorMode ?? "light",
    setColorMode,
  };
  if (colorMode === "dark" || colorMode === "light") {
    res.colorMode = colorMode;
    return res;
  }
  if (typeof systemColorMode !== "string") {
    return res;
  }
  res.isSystemDefault = true;
  res.colorMode = systemColorMode;
  return res;
}
