import axios from "axios";
import graph from "../graph/graph.js";

export async function agent(req, res) {
  try {
    const { prompt, conversationId } = req.body;

    await axios.post(`${process.env.CHAT_SERVICE_URL}/messages/`, {
      conversationId,
      role: "user",
      content: prompt,
    });

    const response = (
      await graph.invoke({
        prompt,
        conversationId,
      })
    ).aiResponse;

    return res.status(200).json({
      message: "Agent Response",
      response,
    });
  } catch (error) {
    console.error("[Agent-Error]", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
