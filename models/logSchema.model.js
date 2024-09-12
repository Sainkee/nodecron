import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // result: {
  //   type: String,
  //   enum: ["Success", "Failure"],
  //   required: true,
  // },
  message: {
    type: String, // Detailed message about the execution (e.g., error messages, success notes)
  },
});

const Log = mongoose.model("Log", LogSchema);

export default Log; // Export the Log model for use in other files.
