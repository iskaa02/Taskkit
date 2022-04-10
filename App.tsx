import "@/db/db";
import dayjs from "dayjs";
import { setNotificationHandler } from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import React from "react";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import Providers from "./src/Providers";

// require("dayjs/locale/ar-ly");
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
