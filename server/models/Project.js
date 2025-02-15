const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    teamMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Section",
      },
    ],
    status: String,
    deadline: Date,
    schedulingAlgorithm: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);