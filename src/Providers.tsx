import theme, { DARK_MODE } from "@/theme/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

type ProviderProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProviderProps) {
  // can't use this use async storage
  const t = React.useMemo(() => {
    // if (colorMode==="light")
    return theme;
    theme.colors = {
      ...theme.colors,
      ...DARK_MODE,
    };
    return theme;
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NativeBaseProvider theme={t}>
          <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
