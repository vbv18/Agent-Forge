import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// for router and chat (fastest, better for routing)
const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.1,
  apiKey: process.env.GROQ_API_KEY,
});

// for coding & search
const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  temperature: 0.2,
  apiKey: process.env.GOOGLE_API_KEY,
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
      return gemini;

    default:
      return groq;
  }
}
