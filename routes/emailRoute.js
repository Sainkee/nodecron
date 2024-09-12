import express from "express";
import sendReminderEmail from "../controllers/email.controller.js";

const router = express.Router();

router.post("/send", sendReminderEmail);

export default router;
