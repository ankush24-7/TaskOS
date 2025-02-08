const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* TO DO:
    * set the default value of icon
*/

const sectionSchema = new Schema(
{
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: "#FBC02D"
  },
  icon: {
    type: String,
    default: ""
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model("Section", sectionSchema);