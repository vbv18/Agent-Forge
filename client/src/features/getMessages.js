import { api } from "../utils/axios.js";

export default async function getMessages(id) {
  try {
    const response = await api.get(`/chat/messages/${id}`);
    return response.data.messages;
  } catch (error) {
    console.error("[Get-Messages Error]", error);
    return null;
  }
}
