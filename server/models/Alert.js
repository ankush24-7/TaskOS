const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alertSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["invite", "connect", "update"],
  },
  content: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  },
  metadata: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Alerts", alertSchema);
