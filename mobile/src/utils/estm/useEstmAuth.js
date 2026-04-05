import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ESTM_NIC_KEY = "@estm_nic";
const ESTM_REMEMBER_KEY = "@estm_remember";

export function useEstmAuth() {
  const [nic, setNic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedNic();
  }, []);

  const loadSavedNic = async () => {
    try {
      const savedNic = await AsyncStorage.getItem(ESTM_NIC_KEY);
      const remember = await AsyncStorage.getItem(ESTM_REMEMBER_KEY);

      if (savedNic && remember === "true") {
        setNic(savedNic);
      }
    } catch (error) {
      console.error("Error loading saved NIC:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (nicValue, remember = false) => {
    try {
      // Em desenvolvimento, aceitar qualquer NIC
      setNic(nicValue);

      if (remember) {
        await AsyncStorage.setItem(ESTM_NIC_KEY, nicValue);
        await AsyncStorage.setItem(ESTM_REMEMBER_KEY, "true");
      } else {
        await AsyncStorage.removeItem(ESTM_NIC_KEY);
        await AsyncStorage.removeItem(ESTM_REMEMBER_KEY);
      }

      return { success: true };
    } catch (error) {
      console.error("Error saving NIC:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      setNic(null);
      await AsyncStorage.removeItem(ESTM_NIC_KEY);
      await AsyncStorage.removeItem(ESTM_REMEMBER_KEY);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return {
    nic,
    loading,
    isAuthenticated: nic !== null,
    login,
    logout,
  };
}



