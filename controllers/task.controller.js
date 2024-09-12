import cron from "node-cron";
import sendReminderEmail from "./email.controller.js";
import Log from "../models/logSchema.model.js";
import Task from "../models/taskSchema.model.js";

// Function to schedule a task
const scheduleTask = (task) => {
  cron.schedule(task.frequency, async () => {
    

    try {
      await sendReminderEmail({
        to: task.email,
        subject: `Reminder: ${task.taskName}`,
        text: `This is a reminder for your scheduled task: ${task.taskName}`,
      });

      // Log the task execution
      await new Log({
        taskId: task._id,
        status: "Completed",
      }).save();

      // Update task status
      task.lastExecuted = new Date();
      task.status = "Completed";
      await task.save();
    } catch (error) {
      console.error(`Error executing task: ${task.taskName}`, error);

      // Log the task failure
      await new Log({
        taskId: task._id,
        status: "Failed",
        error: error.message,
      }).save();
    }
  });
};

// Create and schedule a new task
export const createAndScheduleTask = async (req, res) => {
  const { taskName, schedule, email } = req.body;

  try {
    // Create a new task
    const newTask = new Task({ taskName, frequency: schedule, email });
    await newTask.save();

    // Schedule the new task
    
    scheduleTask(newTask);

    res
      .status(201)
      .json({ message: "Task scheduled successfully", task: newTask });
  } catch (error) {
    console.error("Error scheduling task:", error);
    res.status(500).json({ error: "Error scheduling task" });
  }
};

// Retrieve and schedule all tasks
export const scheduleAllTasks = async () => {
  try {
    const tasks = await Task.find();
    tasks.forEach((task) => scheduleTask(task));
  } catch (error) {
    console.error("Error retrieving and scheduling tasks:", error);
  }
};

// Get all scheduled tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    res.status(500).json({ error: "Error retrieving tasks" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Error deleting task" });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, schedule } = req.body;

    // Validate the cron schedule if updated
    if (schedule && !cron.validate(schedule)) {
      return res.status(400).json({ error: "Invalid cron schedule" });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { taskName, frequency: schedule },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Reschedule the task if necessary
    scheduleTask(task);

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
};

// Schedule all tasks on application startup
// Call this function to schedule tasks when the application starts
scheduleAllTasks();
