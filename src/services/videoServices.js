import { API_BASE_URL } from "./api";
import { getOrCreateChildId } from "./anonymousUserService";

export const getVideosByModule = async (module) => {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/module/${module}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar vídeos.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar vídeos do back:", error);
    throw error;
  }
};

export const completeVideo = async (videoId) => { 
  const childId = await getOrCreateChildId();

  const response = await fetch(
    `${API_BASE_URL}/children/${childId}/videos/${videoId}/complete`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao registrar vídeo como concluído.");
  }

  return await response.json();
};

export const getCompletedVideos  = async () => {
   const childId = await getOrCreateChildId();

   const response = await fetch(`${API_BASE_URL}/children/${childId}/completed-videos`);

   if (!response.ok) {
    throw new Error("Erro ao buscar vídeos concluídos. ");
   }

   return await response.json();
};