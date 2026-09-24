import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import morgan from "morgan";

dotenv.config();


const app = express();


const NODE_ENV = process.env.NODE_ENV;
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));


const auth_service = process.env.AUTH_SERVICE;
app.use('/auth', proxy(auth_service));


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server Gateway is running on port ${port}`);
});