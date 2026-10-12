import { Bot, User } from "lucide-react";

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex items-start gap-3 w-full ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs ${
          isUser
            ? "bg-white/[0.08] text-slate-300 border border-white/[0.1]"
            : "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 shadow-xs shadow-indigo-500/20"
        }`}
        aria-label={isUser ? "User message" : "AgentForge response"}
      >
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>

      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed transition-colors ${
          isUser
            ? "bg-indigo-600/20 text-slate-100 border border-indigo-500/30 rounded-tr-xs"
            : "bg-white/[0.03] text-slate-200 border border-white/[0.07] rounded-tl-xs"
        }`}
      >
        <div className="whitespace-pre-wrap break-words">{content}</div>
      </div>
    </div>
  );
}
