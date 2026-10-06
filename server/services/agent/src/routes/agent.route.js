import { Router } from "express";
import * as agentController from "../controllers/agent.controller.js";

const agentRouter = new Router();

agentRouter.post("/chat", agentController.agent);

export default agentRouter;
