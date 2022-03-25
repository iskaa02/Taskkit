import { useIsFocused } from "@react-navigation/native";
import { useColorModeValue } from "native-base";
import * as React from "react";
import {
  StatusBar as SB,
  StatusBarPropsAndroid,
  StatusBarPropsIOS,
  StatusBarStyle,
} from "react-native";
type StatusBarProps = StatusBarPropsAndroid &
  StatusBarPropsIOS & {
    barStyle?: StatusBarStyle;
    _dark?: StatusBarStyle;
    _light?: StatusBarStyle;
    animated?: boolean;
  };
export default function StatusBar({
  _dark,
  _light,
  barStyle,
  ...p
}: StatusBarProps) {
  const isDarkMode = useColorModeValue(false, true);
  const style = React.useMemo(() => {
    if (_dark && isDarkMode) {
      return _dark;
    }
    if (_light && !isDarkMode) {
      return _light;
    }
    if (typeof barStyle !== "undefined") return barStyle;

    return !isDarkMode ? "dark-content" : "light-content";
  }, [_dark, _light, barStyle, isDarkMode]);
  const isFocused = useIsFocused();

  if (isFocused) {
    return <SB {...p} barStyle={style} />;
  }
  return null;
}
