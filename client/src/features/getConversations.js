import { api } from "../utils/axios";

export default async function getConversations() {
  try {
    const response = await api.get("/chat/conversations");
    return response.data.conversations;
  } catch (error) {
    console.error("[Get-Conversations Error]", error);
    return null;
  }
}
