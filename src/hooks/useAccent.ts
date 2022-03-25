import { listThemeType } from "@/theme/listThemes";
import { useColorModeValue } from "native-base";

export default function useAccent(theme: listThemeType) {
  if (!theme.secondary) {
    return theme.main;
  }

  return useColorModeValue(theme.secondary, theme.main);
}
