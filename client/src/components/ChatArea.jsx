import { useEffect, useState } from "react";
import ChatInput from "./ChatInput.jsx";
import MessageList from "./MessageList.jsx";
import Nav from "./Nav.jsx";
import { useDispatch, useSelector } from "react-redux";
import getMessages from "../features/getMessages.js";
import { setMessages } from "../redux/messageSlice.js";

export default function ChatArea() {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    let isCurrent = true;

    async function fetchMessages() {
      if (selectedConversation?._id) {
        const messages = await getMessages(selectedConversation._id);
        if (isCurrent) {
          dispatch(setMessages(messages || []));
        }
      } else {
        dispatch(setMessages([]));
      }
    }

    fetchMessages();

    return () => {
      isCurrent = false;
    };
  }, [dispatch, selectedConversation?._id]);

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full min-h-0 min-w-0 overflow-hidden bg-[#0d0f14]">
      <Nav />
      <MessageList onSelectPrompt={(p) => setSelectedPrompt(p)} />
      <ChatInput
        initialPrompt={selectedPrompt}
        onResetPrompt={() => setSelectedPrompt("")}
      />
    </main>
  );
}
