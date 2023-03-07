const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId },
    taskName: { type: String },
    taskDate: { type: Date },
    taskStatus: {
      type: String,
      enum: ["Completed", "Incomplete"],
      default: "Incomplete",
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = function (community = process.env.PROJECT_NAME) {
  return mongoose.model(`${community}_tasks`, tasksSchema);
};
