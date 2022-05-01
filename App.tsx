import "@/db/db";
import "@/i18n/i18n";
import { setNotificationHandler } from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import React from "react";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import Providers from "./src/Providers";
import { enableFreeze } from "react-native-screens";
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
  return (
    <Providers>
      <Navigation />
      <StatusBar />
    </Providers>
  );
}
