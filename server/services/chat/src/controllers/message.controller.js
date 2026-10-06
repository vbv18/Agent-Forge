import * as messageRepository from "../repositories/message.repositories.js";

export async function saveMessage(req, res) {
  try {
    const { conversationId, role, content } = req.body;

    await messageRepository.saveMessage(conversationId, role, content);

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

    const messages = await messageRepository.getMessages(conversationId);

    return res.status(200).json({
      message: "Messages fetched Succesfully",
      messages,
    });
  } catch (error) {
    console.error("[Get-Messages-Error]", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
