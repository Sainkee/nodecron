import express from "express";
import {
  createAndScheduleTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", createAndScheduleTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

export default router;
