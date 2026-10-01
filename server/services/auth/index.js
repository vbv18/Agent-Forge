import express from "express";
import "dotenv/config";

import { connectDatabase } from "./src/config/db.js";
import router from "./src/routes/auth.route.js";

const app = express();

app.use(express.json());

app.use("/", router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Auth Service is running on port ${port}`);
  connectDatabase();
});
