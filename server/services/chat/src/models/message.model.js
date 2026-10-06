import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversations",
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
    },
    content: String,
  },
  {
    timestamps: true,
  },
);

const MessageModel = mongoose.model("messages", messageSchema);

export default MessageModel;
