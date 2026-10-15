import { Router } from "express";
import * as conversationController from "../controllers/conversation.controller.js";

const conversationRouter = Router();

conversationRouter.get("/", conversationController.getConversations);

conversationRouter.post("/", conversationController.createConversation);

conversationRouter.patch(
  "/:conversationId",
  conversationController.editConversation,
);

conversationRouter.delete(
  "/:conversationId",
  conversationController.deleteConversation,
);

export default conversationRouter;
