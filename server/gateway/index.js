import "dotenv/config";
import express from "express";
import proxy from "express-http-proxy";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import authMiddleware from "./src/middleware/auth.middleware.js";
import { getCurrentUser } from "./src/controllers/user.controller.js";



const app = express();


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(cookieParser());


app.use('/api/v1/auth', proxy(process.env.AUTH_SERVICE_URL));
app.get("/api/v1/me", authMiddleware, getCurrentUser);



app.listen(process.env.PORT, () => {
    console.log(`Server Gateway is running on port ${process.env.PORT}`);
});
