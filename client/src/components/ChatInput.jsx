import { Mic, Paperclip, Send } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="w-full overflow-hidden px-3 md:px-6 py-4 border-t border-white/[0.06] bg-[#0d0f14] shrink-0">
      <div className="max-w-4xl mx-auto flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] focus-within:border-white/[0.14] focus-within:bg-white/[0.04] rounded-2xl px-4 pt-3.5 pb-3 transition-colors">
        <textarea
          aria-label="Message prompt"
          placeholder="Ask me anything..."
          rows={3}
          className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden disabled:opacity-50"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              title="Attach file"
              aria-label="Attach file"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 cursor-pointer"
            >
              <Paperclip size={15} />
            </button>
            <button
              type="button"
              title="Voice input"
              aria-label="Voice input"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 cursor-pointer"
            >
              <Mic size={15} />
            </button>
          </div>

          <button
            type="button"
            title="Send message"
            aria-label="Send message"
            className="flex items-center justify-center w-8 h-8 rounded-lg border-none cursor-pointer transition-all duration-150 bg-linear-to-br from-indigo-500 to-violet-700 hover:from-indigo-400 hover:to-violet-600 text-white shadow-xs shadow-indigo-950/60"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
