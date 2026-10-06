import express from "express";
import "dotenv/config";

import { connectDatabase } from "./src/config/db.js";
import conversationRouter from "./src/routes/conversation.route.js";
import messageRouter from "./src/routes/message.route.js";

const app = express();

app.use(express.json());

app.use("/conversations", conversationRouter);
app.use("/messages", messageRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Chat Service is running on port ${port}`);
  connectDatabase();
});
