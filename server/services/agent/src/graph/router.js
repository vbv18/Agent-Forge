import getSystemPrompt from "../utils/system-prompt.js";
import getModel from "../config/llm.js";

export async function router(state) {
  const llm = getModel("router");
  const systemPrompt = getSystemPrompt("router", state.prompt);

  const response = await llm.invoke(systemPrompt);

  return {
    ...state,
    agent: response.content.trim().toLowerCase(),
  };
}
