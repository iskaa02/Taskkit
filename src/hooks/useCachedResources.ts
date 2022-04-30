import { storage } from "@/db/storage";
import { changeLanguage } from "@/i18n/i18n";
import { languages } from "@/i18n/langs";
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
          let code = locale[0] + locale[1];
          if (typeof languages[code] === "undefined") {
            code = "en";
          }
          changeLanguage(code);
        } else {
          changeLanguage(lang);
        }
        await Font.loadAsync({
          ...Feather.font,
        });
      } catch (e) {
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
