import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversations",
      index: true,
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
    },
    content: String,
    images: [String],
  },
  {
    timestamps: true,
  },
);

const MessageModel = mongoose.model("messages", messageSchema);

export default MessageModel;
