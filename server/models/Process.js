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
    title: {
      type: String,
      required: [true, "Title is required"],
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
    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    tags: [{ tag: String, color: String }],
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
    notes: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    scheduledAt: {
      startsAt: Date,
      endsAt: Date,
    },
    deadline: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Process", processSchema);