import express from "express";
import dotenv from "dotenv";

import { connectDatabase } from "./config/db.js";


dotenv.config();


const app = express();


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Auth Service is running on port ${port}`);
    connectDatabase();
});