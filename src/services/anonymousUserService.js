import AsyncStorage from "@react-native-async-storage/async-storage";

const CHILD_ID_STORAGE_KEY = "@sorriso_libras:child_id";

const generateChildId = () => {
  return `child_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
};

export const getOrCreateChildId = async () => {
  try {
    const storedChildId = await AsyncStorage.getItem(CHILD_ID_STORAGE_KEY);

    if (storedChildId) {
      return storedChildId;
    }

    const newChildId = generateChildId();

    await AsyncStorage.setItem(CHILD_ID_STORAGE_KEY, newChildId);

    return newChildId;
  } catch (error) {
    console.error("Erro ao obter/criar child_id:", error);
    throw new Error("Não foi possível identificar o usuário do aplicativo.");
  }
};