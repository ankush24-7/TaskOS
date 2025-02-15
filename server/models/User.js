const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  refreshToken: {
    type: String,
    default: "",
  },
  network: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  preferences: {
    projects: {
      sort: { 
        type: String, 
        default: "createdAt",
        enum: ["title", "status", "createdAt", "deadline", "createdBy"],
      },
      order: { type: String, default: "desc" },
    },
    processes: {},
  }
});

module.exports = mongoose.model("User", userSchema);