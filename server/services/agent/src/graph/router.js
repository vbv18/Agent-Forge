import getSystemPrompt from "../utils/system-prompt.js";
import getModel from "../config/llm.js";

export async function router(state) {
  console.log(state.agent);

  if (state.agent && state.agent !== "auto") {
    return {
      ...state,
      agent: state.agent,
    };
  }

  const llm = getModel("router");
  const systemPrompt = getSystemPrompt("router", state.prompt);
  // console.log(systemPrompt);

  const response = await llm.invoke(systemPrompt);
  const text = (response?.content || "").toLowerCase().trim();

  const validAgents = ["coding", "image", "pdf", "ppt", "search", "chat"];
  const matchedAgent =
    validAgents.find((agent) => text.includes(agent)) || "chat";

  return {
    ...state,
    agent: matchedAgent,
  };
}
