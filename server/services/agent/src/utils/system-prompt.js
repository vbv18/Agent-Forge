import * as prompts from "../../../lib/prompts.js";

export default function getSystemPrompt(agent, userPrompt = "") {
  switch (agent) {
    case "router":
      return prompts.router + userPrompt;

    case "chat":
      return prompts.chat;

    case "coding":
      return prompts.coding;

    case "image":
      return prompts.image;

    case "pdf":
      return prompts.pdf;

    case "ppt":
      return prompts.ppt;

    case "search":
      return prompts.search;

    default:
      return "";
  }
}
