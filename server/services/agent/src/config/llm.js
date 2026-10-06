import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.4,
  reasoningEffort: "medium",
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash",
  temperature: 0.4,
  reasoningEffort: "medium",
});

export default function getModel(agent) {
  switch (agent) {
    case "chat":
      return groq;
    case "coding":
      return gemini;
    // case "image": return "image";
    // case "pdf": return "pdf";
    // case "ppt": return "ppt";
    case "search":
      return groq;

    default:
      return groq;
  }
}
