import { Router } from "express";
import * as conversationController from "../controllers/conversation.controller.js";

const conversationRouter = Router();

conversationRouter.get("/", conversationController.getConversations);

conversationRouter.post("/", conversationController.createConversation);

conversationRouter.post("/update", conversationController.updateConversation);

export default conversationRouter;
