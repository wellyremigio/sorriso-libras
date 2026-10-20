import { API_BASE_URL } from "./api";
import { getOrCreateChildId } from "./anonymousUserService";

export const getCurrentBrushingGoal = async () => {
  const childId = await getOrCreateChildId();

  const response = await fetch(
    `${API_BASE_URL}/children/${childId}/brushing-goals/current`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar meta semanal.");
  }

  return await response.json();
};

export const updateBrushingGoalCheck = async ({ day, shift, checked }) => {
  const childId = await getOrCreateChildId();

  const response = await fetch(
    `${API_BASE_URL}/children/${childId}/brushing-goals/current/check`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day,
        shift,
        checked,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao atualizar escovação.");
  }

  return await response.json();
};

export const completeCurrentBrushingGoal = async () => {
  const childId = await getOrCreateChildId();

  const response = await fetch(
    `${API_BASE_URL}/children/${childId}/brushing-goals/current/complete`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao finalizar meta semanal.");
  }

  return await response.json();
};