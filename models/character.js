const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  vision: { type: Schema.Types.ObjectId, ref: "Vision", required: true },
  rarity: { type: String, required: true },
  weapon: { type: String, required: true },
  constellationsOwned: { type: Number },
  imageURL: { type: String, required: true },
});

CharacterSchema.virtual("url").get(function () {
  return `/character/${this._id}`;
});


module.exports = mongoose.model("Character", CharacterSchema);
