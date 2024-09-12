import logSchemaModel from "../models/logSchema.model.js";

// Get task execution logs
export const getLogs = async (req, res) => {
  try {
    const logs = await logSchemaModel.find().populate("taskId");
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error retrieving logs:", error);
    res.status(500).json({ error: "Error retrieving logs" });
  }
};
