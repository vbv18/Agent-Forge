// Search Agent Implementation Roadmap:
// 1. Query external search API (e.g. Tavily, Serper, Google Search) with state.prompt
// 2. Synthesize or rank relevant search results and web citations
// 3. Attach search context to state before passing down the graph to chatAgent
export async function searchAgent(state) {
  return state;
}
