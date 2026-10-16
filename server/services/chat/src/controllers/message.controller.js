import * as messageRepository from "../repositories/message.repositories.js";
import { getConversationById } from "../repositories/conversation.repositories.js";

export async function saveMessage(req, res) {
  try {
    const { conversationId, role, content, images } = req.body;

    if (!conversationId || !role || content === undefined || content === null) {
      return res.status(400).json({
        message: "conversationId, role, and content are required",
      });
    }

    await messageRepository.saveMessage(conversationId, role, content, images);

    return res.status(201).json({
      message: "Message saved successfully",
    });
  } catch (error) {
    console.error("[Save-Message-Error]", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getMessages(req, res) {
  try {
    const { conversationId } = req.params;
    const userId = req.headers["x-user-id"];

    if (!conversationId) {
      return res.status(400).json({
        message: "conversationId is required",
      });
    }

    if (userId) {
      const conv = await getConversationById(conversationId, userId);
      if (!conv) {
        return res.status(404).json({
          message: "Conversation not found or unauthorized",
        });
      }
    }

    const messages = await messageRepository.getMessages(conversationId);

    return res.status(200).json({
      message: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    console.error("[Get-Messages-Error]", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
