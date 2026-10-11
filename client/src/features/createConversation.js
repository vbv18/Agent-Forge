import { api } from "../utils/axios";

export default async function createConversation() {
  try {
    const response = await api.post("/chat/conversations");
    return response.data.conversation;
  } catch (error) {
    console.error("[Create-Conversation Error]", error);
    return null;
  }
}
