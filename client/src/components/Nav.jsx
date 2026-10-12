import { MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";

export default function Nav() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { messages } = useSelector((state) => state.message);

  return (
    <div className="h-14 flex items-center justify-between pl-12 pr-4 lg:px-6 border-b border-white/[0.06] bg-[#0d0f14] shrink-0 select-none">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 shrink-0">
          <MessageSquare size={13} className="text-indigo-400" />
        </div>

        <h1 className="text-[14px] font-semibold text-slate-100 tracking-tight truncate">
          {selectedConversation?.title?.trim() || "New Chat"}
        </h1>

        {selectedConversation && (
          <span className="text-[10px] font-medium text-slate-500 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full shrink-0">
            {messages?.length ?? 0}{" "}
            {messages?.length === 1 ? "Message" : "Messages"}
          </span>
        )}
      </div>
    </div>
  );
}
