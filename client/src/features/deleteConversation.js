import { api } from "../utils/axios";

export default async function deleteConversation(conversationId) {
  try {
    const response = await api.delete(`/chat/conversations/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error("[Delete-Conversation Error]", error);
    return null;
  }
}
