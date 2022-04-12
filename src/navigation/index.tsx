import { DARK_MODE, LIGHT_MODE } from "@/theme/theme";
import { OverflowMenuProvider } from "react-navigation-header-buttons";
import { NavigationContainer, Theme } from "@react-navigation/native";
import { setBackgroundColorAsync } from "expo-navigation-bar";
import { useColorModeValue } from "native-base";
import React from "react";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootNavigator } from "./RootStack";
const DarkTheme: Theme = {
  dark: true,
  colors: {
    background: DARK_MODE.background,
    text: DARK_MODE.em[1],
    primary: DARK_MODE.em[2],
    card: DARK_MODE.surface,
    border: DARK_MODE.em[4],
    notification: "red",
  },
};
const LightTheme: Theme = {
  dark: false,
  colors: {
    background: LIGHT_MODE.background,
    text: LIGHT_MODE.em[1],
    primary: LIGHT_MODE.em[1],
    card: LIGHT_MODE.surface,
    border: LIGHT_MODE.em[4],
    notification: "red",
  },
};
export default function Navigation() {
  const isDarkMode = useColorModeValue(false, true);
  React.useEffect(() => {
    setBackgroundColorAsync(isDarkMode ? "#323232" : "#fff");
  }, [isDarkMode]);
  return (
    <NavigationContainer
      theme={isDarkMode ? DarkTheme : LightTheme}
      linking={LinkingConfiguration}
    >
      <OverflowMenuProvider>
        <RootNavigator />
      </OverflowMenuProvider>
    </NavigationContainer>
  );
}
