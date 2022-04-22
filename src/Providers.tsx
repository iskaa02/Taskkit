import theme, { colorModeManager, DARK_MODE } from "@/theme/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useMMKVString } from "react-native-mmkv";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { storage } from "./db/db";

type ProviderProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProviderProps) {
  const [colorMode, _] = useMMKVString("@color-mode", storage);
  const t = React.useMemo(() => {
    if (colorMode === "dark")
      return {
        ...theme,
        colors: {
          ...theme.colors,
          ...DARK_MODE,
        },
      };
    return theme;
  }, [colorMode]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NativeBaseProvider theme={t} colorModeManager={colorModeManager}>
          <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
