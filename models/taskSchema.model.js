import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true, // Cron expression for scheduling
  },
  email: {
    type: String,
    required: true, // Email address for sending notifications
  },
  // taskType: {
  //   type: String,
  //   enum: ["email", "cleanup"], // Types of tasks: 'email' for sending emails, 'cleanup' for clearing data
  //   required: true,
  // },
  // status: {
  //   type: String,
  //   enum: ["Active", "Inactive"],
  //   default: "Active", // Default status for new tasks
  // },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date
  },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
