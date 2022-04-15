import i18n from "i18next";
import intervalPlural from "i18next-intervalplural-postprocessor";
import "intl-pluralrules";
import "intl-pluralrules/plural-rules";
import { initReactI18next } from "react-i18next";
import { changeLanguage, languages } from "./langs";
import "dayjs/locale/ar";
changeLanguage("ar");
i18n
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    supportedLngs: Object.keys(languages),
    lng: "ar",
    fallbackLng: "ar",
    resources: languages,
    load: "languageOnly",
  });
export default i18n;
