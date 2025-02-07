const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
{
  title: {
    type: String,
    required: true,
  },
  status: { type: String },
  deadline: { type: Date },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  description: { type: String },
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
},
{
  timestamps: true,
});

module.exports = mongoose.model("Project", projectSchema);