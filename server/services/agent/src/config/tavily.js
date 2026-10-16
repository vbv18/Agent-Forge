import { TavilySearch } from "@langchain/tavily";

export const searchTool = new TavilySearch({
  maxResults: 1,
  topic: "general",
  includeImages: true,
  searchDepth: "basic",
});
