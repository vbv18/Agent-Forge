import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed break-words
          ${
            isUser
              ? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
              : "bg-white/[0.04] border border-white/[0.07] text-slate-200 rounded-tl-sm [&_pre]:bg-black/30 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_code]:font-mono [&_table]:border-collapse [&_th]:border [&_th]:border-white/10 [&_th]:p-2 [&_td]:border [&_td]:border-white/10 [&_td]:p-2"
          }`}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{content || ""}</Markdown>
      </div>
    </div>
  );
}
