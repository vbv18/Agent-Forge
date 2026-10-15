import getSystemPrompt from "../utils/system-prompt.js";
import getModel from "../config/llm.js";
import { getMemory } from "../config/memory.js";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

export async function chatAgent(state) {
  const llm = getModel("chat");
  const systemPrompt = getSystemPrompt("chat");
  // console.log(systemPrompt);

  const history = (await getMemory(state.conversationId)) || [];
  const messages = [new SystemMessage(systemPrompt)];

  history.forEach((msg) => {
    if (msg.role === "user") {
      messages.push(new HumanMessage(msg.content));
    } else {
      messages.push(new AIMessage(msg.content));
    }
  });

  const lastMsg = history[history.length - 1];
  if (!lastMsg || lastMsg.role !== "user" || lastMsg.content !== state.prompt) {
    messages.push(new HumanMessage(state.prompt));
  }

  // console.log(messages);

  const response = await llm.invoke(messages);

  return {
    ...state,
    aiResponse: response.content.trim(),
  };
}
