import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./utils/dbConnect.js";

import taskRoute from "./routes/taskRoute.js";

import emailRoute from "./routes/emailRoute.js";

import logRoutes from "./routes/logRoute.js";
const app = express();
dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/tasks", taskRoute);
app.use("/emails", emailRoute);
app.use("/logs", logRoutes);
dbConnect();

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
