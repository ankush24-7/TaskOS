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
  color: {
    type: String,
    required: true,
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
  organization: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  displayPicture: {
    publicId: {
      type: String,
      default: "",
    },
  },
  network: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  requests: [{
    _id: false,
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
    type: {
      type: String,
      enum: ["connect", "invite"],
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
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
  },
});

module.exports = mongoose.model("User", userSchema);