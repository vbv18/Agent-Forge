import { Router } from "express";
import * as messageController from "../controllers/message.controller.js";

const messageRouter = new Router();

messageRouter.get("/:conversationId", messageController.getMessages);

messageRouter.post("/", messageController.saveMessage);

export default messageRouter;
