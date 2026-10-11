import { api } from "../utils/axios";

export default async function updateConversation() {
  try {
    const response = await api.post("/chat/conversations/update");
    return response.data.conversation;
  } catch (error) {
    console.error("[Create-Conversation Error]", error);
    return null;
  }
}
