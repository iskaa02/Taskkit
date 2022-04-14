import { listThemeType } from "@/theme/listThemes";
import { useColorModeValue } from "native-base";

type useAccentOptions = {
  noSecondary?: string;
  flip?: boolean;
};
export default function useAccent(
  theme: listThemeType,
  { noSecondary: defaultSecondary, flip }: useAccentOptions = {}
) {
  if (!theme.secondary) {
    return defaultSecondary ?? theme.main;
  }
  if (flip) {
    return useColorModeValue(theme.main, theme.secondary);
  }
  return useColorModeValue(theme.secondary, theme.main);
}
