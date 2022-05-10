import i18next from "i18next";
import { useAsync } from "@/global";

export const setupLanguage = (language: string = "vi") => {
  return i18next.init({
    lng: language,
    compatibilityJSON: "v3",
    fallbackLng: "vi",
    debug: false,
    resources: {
      vi: {
        translation: {
          ...require("../languages/vi.json"),
        },
      },
      en: {
        translation: {
          ...require("../languages/en.json"),
        },
      },
    },
  });
};

export const useSetupLanguage = () => {
  return useAsync(() => {
    return setupLanguage("vi");
  }, []);
};

export const changeLanguage = (lng: string) => {
  i18next.changeLanguage(lng);
  //TODO: change moment locale
  //TODO: change LocaleConfig of react-native-calendars
};
export default useSetupLanguage;

export const translate = i18next.t.bind(i18next);
