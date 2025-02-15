const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* TO DO:
  * set the default value of icon
*/

const sectionSchema = new Schema(
{
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: "#FBC02D"
  },
  // icon: {
  //   type: String,
  //   default: ""
  // },
  pos: {
    type: Number,
    required: true
  },
  processes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Process",
    },
  ],
},
{
  timestamps: true,
});

module.exports = mongoose.model("Section", sectionSchema);