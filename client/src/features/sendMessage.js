import { api } from "../utils/axios.js";

export default async function sendMessage(payload) {
  try {
    const response = await api.post("/agent/chat", payload);
    return response.data.aiResponse;
  } catch (error) {
    console.error("[Send-Message Error]", error);
    throw error;
  }
}
