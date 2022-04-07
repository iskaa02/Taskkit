import "@/db/db";
import { StatusBar } from "expo-status-bar";
import React from "react";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import Providers from "./src/Providers";

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <Providers>
      <Navigation />
      <StatusBar />
    </Providers>
  );
}
