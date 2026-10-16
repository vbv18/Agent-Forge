import * as prompts from "../../../lib/prompts.js";

export default function getSystemPrompt(agent, content = "") {
  switch (agent) {
    case "router":
      return prompts.router + content;

    case "chat":
      return prompts.chat + content;

    case "coding":
      return prompts.coding;

    case "image":
      return prompts.image;

    case "pdf":
      return prompts.pdf;

    case "ppt":
      return prompts.ppt;

    case "search":
      return prompts.search + content;

    default:
      return "";
  }
}
