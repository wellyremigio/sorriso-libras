import { Platform } from "react-native";

const getApiBaseUrl = () => {
  if (Platform.OS === "android") {
    return "https://sorriso-libras-backend.onrender.com";
  }

  if (Platform.OS === "web") {
    return "https://sorriso-libras-backend.onrender.com";
  }

  return "https://sorriso-libras-backend.onrender.com";
};

export const API_BASE_URL = getApiBaseUrl();