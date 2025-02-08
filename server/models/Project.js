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
  status: { type: String },
  deadline: { type: Date },
  teamMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
{
  timestamps: true,
});

module.exports = mongoose.model("Project", projectSchema);