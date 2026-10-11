import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
    selectedConversation: null,
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = Array.isArray(action.payload) ? action.payload : [];
    },
    addConversation: (state, action) => {
      if (action.payload) {
        state.conversations.unshift(action.payload);
      }
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
});

export const { setConversations, addConversation, setSelectedConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;
