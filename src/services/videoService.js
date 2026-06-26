import { API_BASE_URL } from "./api";

export const getVideosByMudule = async (module) => {
    const response = await fetch(`${API_BASE_URL}/videos/module/${module}`);

    if (!response.ok) {
        throw new Error("Erro ao buscar vídeos");
    }
    
    return await response.json();
};
