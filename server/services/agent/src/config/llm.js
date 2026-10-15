import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const groq = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0.5,
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-3.1-flash",
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
      return groq;

    default:
      return groq;
  }
}
