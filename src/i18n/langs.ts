import { storage } from "@/db/db";
import dayjs from "dayjs";
import { I18nManager } from "react-native";
import { default as ar } from "./ar.json";
import { default as en } from "./en.json";

export type languageType = {
  type: "rtl" | "ltr";
  translation: { [x: string]: any };
};
export const languages = {
  ar: { translation: ar, type: "rtl" },
  en: { translation: en, type: "ltr" },
};

export const changeLanguage = (lang: keyof typeof languages) => {
  storage.set("lang", lang);
  I18nManager.allowRTL(languages[lang].type === "rtl");
  I18nManager.forceRTL(languages[lang].type === "rtl");
  dayjs.locale(lang);
};
