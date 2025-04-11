const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const processSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    pos: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    starred: {
      type: Boolean, 
      default: false,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      default: "",
    },
    schedule: {
      type: Boolean,
      default: false,
    },
    showDeadline: {
      type: Boolean,
      default: false,
    },
    color: {
      name: {
        type: String,
        default: "Light blue",
      },
      hex: {
        type: String,
        default: "#E0EBF5",
      },
    },
    log: [
      {
        description: String,
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {type: Date, default: Date.now},
      },
    ],
    deadline: Date,
    startsAt: Date,
    endsAt: Date,
    duration: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Process", processSchema);