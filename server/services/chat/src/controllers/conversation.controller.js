import * as conversationRepository from "../repositories/conversation.repositories.js";

export async function createConversation(req, res) {
  try {
    const userId = req.headers["x-user-id"];
    const conversation =
      await conversationRepository.createConversation(userId);

    return res.status(201).json({
      message: "Conversation created successfully",
      conversation,
    });
  } catch (error) {
    console.error("[Create-Conversation-Error]", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getConversations(req, res) {
  try {
    const userId = req.headers["x-user-id"];
    const conversations = await conversationRepository.getConversations(userId);

    return res.status(200).json({
      message: "Conversations fetched successfully",
      conversations,
    });
  } catch (error) {
    console.error("[Get-Conversations-Error]", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function updateConversation(req, res) {
  try {
    const { conversationId, newTitle } = req.body;

    const conversation = await conversationRepository.updateConversationById(
      conversationId,
      newTitle,
    );

    return res.status(200).json({
      message: "Update Successfuly",
      conversation,
    });
  } catch (error) {
    console.error("[Update-Conversations-Error]", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
