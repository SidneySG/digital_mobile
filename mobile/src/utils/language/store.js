import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGE_STORAGE_KEY = "@app_language";

export const useLanguageStore = create((set) => ({
  language: "pt",
  setLanguage: async (language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      set({ language });
    } catch (error) {
      console.error("Error saving language:", error);
    }
  },
  loadLanguage: async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage) {
        set({ language: savedLanguage });
      }
    } catch (error) {
      console.error("Error loading language:", error);
    }
  },
}));



