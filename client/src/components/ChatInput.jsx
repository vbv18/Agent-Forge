import { Mic, Paperclip, Send, LoaderCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import sendMessage from "../features/sendMessage.js";
import createConversation from "../features/createConversation.js";
import editConversation from "../features/editConversation.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  setConversationTitle,
  setSelectedConversation,
} from "../redux/conversationSlice.js";
import { addMessage } from "../redux/messageSlice.js";

export default function ChatInput({ initialPrompt, onResetPrompt }) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [prevInitialPrompt, setPrevInitialPrompt] = useState(initialPrompt);
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((state) => state.conversation);

  if (initialPrompt && initialPrompt !== prevInitialPrompt) {
    setPrevInitialPrompt(initialPrompt);
    setValue(initialPrompt);
    onResetPrompt?.();
  }

  async function handleSendMessage() {
    const prompt = value.trim();

    if (!prompt || isLoading) return;

    setIsLoading(true);
    setErrorMessage("");
    setValue("");

    try {
      let currentConv = selectedConversation;

      if (!currentConv?._id) {
        const newConv = await createConversation();
        if (newConv && newConv._id) {
          dispatch(addConversation(newConv));
          dispatch(setSelectedConversation(newConv));
          currentConv = newConv;
        } else {
          throw new Error("Unable to create a new conversation");
        }
      }

      if (currentConv && currentConv.title === "New Chat") {
        const truncatedTitle =
          prompt.length > 20 ? prompt.slice(0, 40) + "..." : prompt;
        await editConversation(currentConv._id, truncatedTitle);
        dispatch(
          setConversationTitle({
            conversationId: currentConv._id,
            newTitle: truncatedTitle,
          }),
        );
      }

      dispatch(
        addMessage({
          role: "user",
          content: prompt,
        }),
      );

      const payload = {
        prompt,
        conversationId: currentConv?._id,
      };

      const aiResponse = await sendMessage(payload);

      if (aiResponse) {
        dispatch(
          addMessage({
            role: "assistant",
            content: aiResponse,
          }),
        );
      }
    } catch (error) {
      console.error("[Chat-Input-Error]", error);
      setValue(prompt);
      setErrorMessage(
        error?.response?.data?.message ||
          "Unable to send message. Please ensure backend services are running.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full overflow-hidden px-3 md:px-6 py-4 border-t border-white/[0.06] bg-[#0d0f14] shrink-0">
      {errorMessage && (
        <div className="max-w-4xl mx-auto mb-2.5 px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <AlertCircle size={14} className="shrink-0 text-rose-400" />
            <span className="truncate">{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage("")}
            className="text-[11px] underline opacity-80 hover:opacity-100 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
      <div className="max-w-4xl mx-auto flex flex-col gap-2 bg-white/[0.03] border border-white/[0.07] focus-within:border-white/[0.14] focus-within:bg-white/[0.04] rounded-2xl px-4 pt-3.5 pb-3 transition-colors">
        <textarea
          aria-label="Message prompt"
          placeholder="Ask me anything..."
          rows={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden disabled:opacity-50"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              title="Attach file"
              aria-label="Attach file"
              disabled={isLoading}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 cursor-pointer"
            >
              <Paperclip size={15} />
            </button>
            <button
              type="button"
              title="Voice input"
              aria-label="Voice input"
              disabled={isLoading}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] border border-transparent hover:border-white/[0.06] transition-all duration-150 cursor-pointer"
            >
              <Mic size={15} />
            </button>
          </div>

          <button
            type="button"
            title={isLoading ? "Sending message..." : "Send message"}
            aria-label={isLoading ? "Sending message" : "Send message"}
            disabled={!value.trim() || isLoading}
            onClick={handleSendMessage}
            className={`flex items-center justify-center w-8 h-8 rounded-lg border-none transition-all duration-150 ${
              value.trim() && !isLoading
                ? "bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white cursor-pointer"
                : "bg-white/[0.05] text-slate-600 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
