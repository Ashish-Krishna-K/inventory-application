const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VisionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  archon: { type: String, required: true },
});

VisionSchema.virtual("url").get(function () {
  return `/vision/${this._id}`;
});

module.exports = mongoose.model("Vision", VisionSchema);