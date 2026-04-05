import { useLanguageStore } from "./store";
import { translations } from "./translations";

export const useTranslation = () => {
  const language = useLanguageStore((state) => state.language);

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return value || key;
  };

  return { t, language };
};



