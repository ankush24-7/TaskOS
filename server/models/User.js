const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
        default: "updatedat",
        enum: ["title", "status", "updatedat", "deadline", "createdby"],
      },
      order: { type: String, default: "desc" },
    },
    processes: {},
  } 
});

module.exports = mongoose.model("User", userSchema);