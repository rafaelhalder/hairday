import { apiConfig } from "./api-config.js";

export async function scheduleCancel({ id }) {
  try {
    await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
    alert("Não foi possivel cancelar o agendamento");
  }
}
