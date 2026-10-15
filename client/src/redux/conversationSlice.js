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
    setConversationTitle: (state, action) => {
      const payload = action.payload || {};
      const conversationId = payload.conversationId || payload._id;
      const newTitle = payload.newTitle ?? payload.title;

      if (!conversationId || newTitle === undefined) return;

      state.conversations = state.conversations.map((conv) =>
        conv?._id === conversationId
          ? {
              ...conv,
              title: newTitle,
            }
          : conv,
      );

      if (state.selectedConversation?._id === conversationId) {
        state.selectedConversation = {
          ...state.selectedConversation,
          title: newTitle,
        };
      }
    },
    editConversation: (state, action) => {
      const payload = action.payload || {};
      const conversationId = payload.conversationId || payload._id;
      const newTitle = payload.newTitle ?? payload.title;

      if (!conversationId || newTitle === undefined) return;

      state.conversations = state.conversations.map((conv) =>
        conv?._id === conversationId
          ? {
              ...conv,
              title: newTitle,
            }
          : conv,
      );

      if (state.selectedConversation?._id === conversationId) {
        state.selectedConversation = {
          ...state.selectedConversation,
          title: newTitle,
        };
      }
    },
    deleteConversation: (state, action) => {
      const id =
        typeof action.payload === "object"
          ? action.payload?._id || action.payload?.conversationId
          : action.payload;
      state.conversations = state.conversations.filter((c) => c._id !== id);
      if (state.selectedConversation?._id === id) {
        state.selectedConversation =
          state.conversations.length > 0 ? state.conversations[0] : null;
      }
    },
  },
});

export const {
  setConversations,
  addConversation,
  setSelectedConversation,
  setConversationTitle,
  editConversation,
  deleteConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
