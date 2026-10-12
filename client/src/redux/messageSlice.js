import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      const msgs = Array.isArray(action.payload) ? action.payload : [];
      state.messages = [...msgs].sort(
        (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
      );
    },
    addMessage: (state, action) => {
      if (action.payload) {
        state.messages.push(action.payload);
      }
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
