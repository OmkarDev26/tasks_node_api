const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("registered_users", UserSchema);

module.exports = function (community = process.env.PROJECT_NAME) {
  return mongoose.model(`${community}_registered_users`, UserSchema);
};
