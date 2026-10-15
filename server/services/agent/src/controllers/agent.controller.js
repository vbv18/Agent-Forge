import axios from "axios";
import graph from "../graph/graph.js";
import { updateMemoryBatch } from "../config/memory.js";

export async function agent(req, res) {
  try {
    const { prompt, conversationId } = req.body;
    const userId = req.headers["x-user-id"];
    const chatServiceUrl = process.env.CHAT_SERVICE_URL;

    if (!prompt.trim() || !conversationId.trim()) {
      return res.status(400).json({
        message: "prompt and conversationId are required",
      });
    }

    if (!chatServiceUrl) {
      throw new Error("CHAT_SERVICE_URL is not configured");
    }

    const requestHeaders = userId ? { "x-user-id": userId } : {};

    // 1. Persist user message.
    await axios.post(
      `${chatServiceUrl}/messages/`,
      {
        conversationId,
        role: "user",
        content: prompt,
      },
      { headers: requestHeaders, timeout: 10000 },
    );

    // 2. Generate the response.
    const result = await graph.invoke({
      prompt,
      conversationId,
    });

    const aiResponse = result.aiResponse.trim()
      ? result.aiResponse.trim()
      : "I'm sorry, I couldn't generate a response for your request.";

    // 3. Persist assistant message.
    await axios.post(
      `${chatServiceUrl}/messages/`,
      {
        conversationId,
        role: "assistant",
        content: aiResponse,
      },
      { headers: requestHeaders, timeout: 10000 },
    );

    // 4. Update Redis once, after persistence succeeds.
    try {
      await updateMemoryBatch(conversationId, [
        { role: "user", content: prompt },
        { role: "assistant", content: aiResponse },
      ]);
    } catch (cacheError) {
      console.error("[Memory-Cache-Error]", cacheError.message);
    }

    return res.status(200).json({
      message: "Agent Response",
      aiResponse,
    });
  } catch (error) {
    console.error(
      "[Agent-Error]",
      error?.response?.data || error?.message || error,
    );

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
