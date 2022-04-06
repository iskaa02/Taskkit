import Theme from "@/db/models/Theme";
import { useColorModeValue } from "native-base";

export default function useAccent(theme: Theme) {
  if (!theme.secondary) {
    return theme.main;
  }

  return useColorModeValue(theme.secondary, theme.main);
}
