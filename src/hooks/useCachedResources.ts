import { storage } from "@/db/storage";
import { changeLanguage } from "@/i18n/i18n";
import { Feather } from "@expo/vector-icons";
import * as Font from "expo-font";
import { locale } from "expo-localization";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        const lang = storage.getString("lang");
        if (!lang) {
          changeLanguage(locale);
        } else {
          changeLanguage(lang);
        }

        // Load fonts
        await Font.loadAsync({
          ...Feather.font,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
