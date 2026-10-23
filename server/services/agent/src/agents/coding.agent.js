import getSystemPrompt from "../utils/system-prompt.js";
import getModel, { groq, openrouter } from "../config/llm.js";
import { getMemory } from "../config/memory.js";
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

function extractJson(text) {
  if (!text || typeof text !== "string") return null;
  const trimmed = text.trim();

  // 1. Direct JSON parse
  try {
    return JSON.parse(trimmed);
  } catch {
    // continue
  }

  // 2. Try markdown code block ```json ... ``` or ``` ... ```
  const matchFence = trimmed.match(new RegExp("```(?:json)?\\s*([\\s\\S]*?)\\s*```", "i"));
  if (matchFence && matchFence[1]) {
    try {
      return JSON.parse(matchFence[1].trim());
    } catch {
      // continue
    }
  }

  // 3. Try finding outermost { and }
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    } catch {
      // continue
    }
  }

  return null;
}

export async function codingAgent(state) {
  const intentLlm = getModel("intent");
  const intentPrompt = getSystemPrompt("intent", state.prompt);
  let intent = "CODE_GENERATION";

  try {
    const intentResponse = await intentLlm.invoke(intentPrompt);
    const rawIntent = (intentResponse?.content || "").toString().trim().toUpperCase();
    if (rawIntent) {
      intent = rawIntent;
    }
  } catch (err) {
    console.warn("[CodingAgent] Intent classification warning:", err.message);
  }

  const isGenerationIntent =
    intent.includes("CODE_GENERATION") ||
    intent.includes("GENERATE") ||
    intent.includes("CREATE") ||
    intent.includes("BUILD") ||
    intent.includes("DEVELOP");

  if (isGenerationIntent) {
    const systemPrompt = getSystemPrompt("code_generation", state.prompt);

    let rawContent = "";
    // Primary model invocation with fallback
    try {
      const response = await groq.invoke(systemPrompt);
      rawContent =
        typeof response?.content === "string"
          ? response.content
          : JSON.stringify(response?.content || "");
    } catch (primaryErr) {
      console.warn(
        "[CodingAgent] Primary LLM failed, trying fallback:",
        primaryErr.message,
      );
      try {
        const fallbackResponse = await openrouter.invoke(systemPrompt);
        rawContent =
          typeof fallbackResponse?.content === "string"
            ? fallbackResponse.content
            : JSON.stringify(fallbackResponse?.content || "");
      } catch (fallbackErr) {
        console.error("[CodingAgent] Both LLMs failed:", fallbackErr.message);
        throw fallbackErr;
      }
    }

    const parsed = extractJson(rawContent);

    if (parsed && typeof parsed === "object") {
      const rawFiles = Array.isArray(parsed.files) ? parsed.files : [];
      const files = rawFiles.map((file, idx) => ({
        name: file?.name || `file_${idx + 1}.js`,
        content: file?.content || "",
      }));

      const artifactData = {
        id: String(parsed.id || Date.now()),
        title: parsed.title || "Code Artifact",
        taskType: parsed.taskType || "web",
        language: parsed.language || "JavaScript",
        framework: parsed.framework || "React",
        files,
        entryPoint: parsed.entryPoint || files[0]?.name || "",
        notes: Array.isArray(parsed.notes) ? parsed.notes : [],
      };

      return {
        ...state,
        aiResponse:
          parsed.explanation ||
          `I've generated the code artifact: "${artifactData.title}". You can explore, inspect, and copy all files in the artifact panel.`,
        artifact: [artifactData],
      };
    }

    // If output wasn't valid JSON, check for code fences to build a fallback artifact
    const codeBlocks = [
      ...rawContent.matchAll(new RegExp("```([a-zA-Z0-9_-]*)\\s*([\\s\\S]*?)\\s*```", "g")),
    ];

    if (codeBlocks.length > 0) {
      const fallbackFiles = codeBlocks.map((match, i) => {
        const lang = match[1] || "txt";
        return {
          name: `solution_${i + 1}.${lang === "javascript" || lang === "js" ? "js" : lang === "typescript" || lang === "ts" ? "ts" : lang === "html" ? "html" : lang === "css" ? "css" : lang === "python" || lang === "py" ? "py" : lang === "json" ? "json" : "txt"}`,
          content: match[2].trim(),
        };
      });

      const artifactData = {
        id: String(Date.now()),
        title: "Generated Code Solution",
        taskType: "web",
        language: codeBlocks[0][1] || "code",
        framework: "standard",
        files: fallbackFiles,
        entryPoint: fallbackFiles[0]?.name || "",
        notes: [],
      };

      return {
        ...state,
        aiResponse: rawContent,
        artifact: [artifactData],
      };
    }

    return {
      ...state,
      aiResponse: rawContent || "Code generation completed.",
      artifact: [],
    };
  }

  // Non-generation intents (e.g. CODE_EXPLANATION, CODE_REVIEW, DEBUGGING, OPTIMIZATION)
  const systemPrompt = `You are AgentForge, an elite software engineering assistant.
Provide clear, expert answers with concise explanations, best practices, and formatted code blocks where relevant.
User Request:
${state.prompt}`;

  const history = (await getMemory(state.conversationId)) || [];
  const messages = [new SystemMessage(systemPrompt)];

  history.forEach((msg) => {
    if (msg.role === "user") {
      messages.push(new HumanMessage(msg.content));
    } else {
      messages.push(new AIMessage(msg.content));
    }
  });

  const lastMsg = history.at(-1);
  if (lastMsg?.role !== "user" || lastMsg?.content !== state.prompt) {
    messages.push(new HumanMessage(state.prompt));
  }

  let response;
  try {
    response = await groq.invoke(messages);
  } catch {
    response = await openrouter.invoke(messages);
  }

  const aiResponse =
    typeof response?.content === "string"
      ? response.content.trim()
      : JSON.stringify(response?.content || "");

  return {
    ...state,
    aiResponse,
    artifact: [],
  };
}
