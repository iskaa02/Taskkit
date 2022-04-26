import { storage } from "@/db/db";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import i18n from "i18next";
import intervalPlural from "i18next-intervalplural-postprocessor";
import "intl-pluralrules";
import "intl-pluralrules/plural-rules";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import Restart from "react-native-restart";
import { default as ar } from "./ar.json";
import { default as en } from "./en.json";
import { languages, setCalendarLanguage } from "./langs";

i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    supportedLngs: Object.keys(languages),
    fallbackLng: "en",
    resources: { ar: { translation: ar }, en: { translation: en } },
    load: "languageOnly",
  });
export const changeLanguage = (lang: string) => {
  storage.set("lang", lang);
  const isRTL = I18nManager.isRTL;
  if (isRTL) {
    if (languages[lang].type !== "rtl") {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
      Restart.Restart();
    }
  } else {
    if (languages[lang].type === "rtl") {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      Restart.Restart();
    }
  }
  i18n.changeLanguage(lang);
  setCalendarLanguage(lang);
  dayjs.locale(lang);
};
export default i18n;
