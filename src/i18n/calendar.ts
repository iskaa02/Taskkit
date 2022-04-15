import { storage } from "@/db/db";
import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales = {
  ar: {
    monthNames:
      "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
        "_"
      ),
    dayNames: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
    monthNamesShort:
      "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
        "_"
      ),
    dayNamesShort: "ح_ن_ث_ر_خ_ج_س".split("_"),
  },
};

(() => {
  const lang = storage.getString("lang");
  if (lang) LocaleConfig.defaultLocale = lang;
})();
