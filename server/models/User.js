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
  ]
});

module.exports = mongoose.model("User", userSchema);