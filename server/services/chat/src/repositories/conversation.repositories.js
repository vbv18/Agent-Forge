import ConversationModel from "../models/conversation.model.js";

export async function createConversation(userId) {
  const conversation = await ConversationModel.create({
    userId,
  });

  return conversation;
}

export async function getConversations(userId) {
  const conversations = await ConversationModel.find({
    userId,
  });
  return conversations;
}

export async function updateConversationById(id, title) {
  const conversation = await ConversationModel.findByIdAndUpdate(id, {
    title,
  });

  return conversation;
}
