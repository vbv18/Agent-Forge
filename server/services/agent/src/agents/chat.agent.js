import getSystemPrompt from "../utils/system-prompt.js";
import getModel from "../config/llm.js";

export async function chatAgent(state) {
  const llm = getModel("chat");
  const systemPrompt = getSystemPrompt("chat");

  const response = await llm.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "human",
      content: state.prompt,
    },
  ]);

  return {
    ...state,
    aiResponse: response.content.trim(),
  };
}
