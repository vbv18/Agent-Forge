import MessageModel from "../models/message.model.js";

export async function saveMessage(conversationId, role, content) {
  const message = await MessageModel.create({
    conversationId,
    role,
    content,
  });

  return message;
}

export async function getMessages(conversationId) {
  const messages = await MessageModel.find({
    conversationId,
  }).sort({
    createdAt: -1,
  });

  return messages;
}
