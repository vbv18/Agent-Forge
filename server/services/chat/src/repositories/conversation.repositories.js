import mongoose from "mongoose";
import ConversationModel from "../models/conversation.model.js";
import MessageModel from "../models/message.model.js";

export async function createConversation(userId) {
  const conversation = await ConversationModel.create({
    userId,
  });

  return conversation;
}

export async function getConversations(userId) {
  if (!userId) return [];
  const conversations = await ConversationModel.find({
    userId,
  }).sort({ updatedAt: -1 });
  return conversations;
}

export async function getConversationById(id, userId) {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const query = userId ? { _id: id, userId } : { _id: id };
  return await ConversationModel.findOne(query);
}

export async function updateConversationById(id, userId, title) {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const query = userId ? { _id: id, userId } : { _id: id };
  const conversation = await ConversationModel.findOneAndUpdate(
    query,
    {
      title,
    },
    { returnDocument: "after" },
  );

  return conversation;
}

export async function deleteConversationById(id, userId) {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const query = userId ? { _id: id, userId } : { _id: id };
  const conversation = await ConversationModel.findOneAndDelete(query);

  if (conversation) {
    await MessageModel.deleteMany({
      conversationId: id,
    });
  }

  return conversation;
}
