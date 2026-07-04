import { API_BASE_URL } from "./api";
import { getOrCreateChildId } from "./anonymousUserService";

export const getChildStickerGallery = async () => {
  const childId = await getOrCreateChildId();

  const response = await fetch(`${API_BASE_URL}/children/${childId}/stickers`);

  if (!response.ok) {
    throw new Error("Erro ao buscar galeria de adesivos.");
  }

  return await response.json();
};