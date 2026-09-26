import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

const NODE_ENV = process.env.NODE_ENV;
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(cookieParser());



const auth_service = process.env.AUTH_SERVICE_URL;
app.use('/auth', proxy(auth_service));


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server Gateway is running on port ${port}`);
});