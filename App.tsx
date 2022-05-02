import "@/db/db";
import "@/i18n/i18n";
import { setNotificationHandler } from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import React from "react";
// @ts-ignore NO TYPESCRIPT d.ts
import { connectToDevTools } from "react-devtools-core";
import { enableFreeze } from "react-native-screens";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import Providers from "./src/Providers";

enableFreeze(true);
export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  if (__DEV__) {
    connectToDevTools({
      host: "localhost",
      port: 8097,
    });
  }
  return (
    <Providers>
      <Navigation />
      <StatusBar />
    </Providers>
  );
}
