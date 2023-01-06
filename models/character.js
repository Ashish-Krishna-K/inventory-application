const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  vision: { type: Schema.Types.ObjectId, ref: "Vision", required: true },
  rarity: { type: String, required: true },
  weapon: { type: String, required: true },
  constellationsOwned: { type: Number },
});

CharacterSchema.virtual("url").get(function () {
  return `/character/${this._id}`;
});

CharacterSchema.virtual("image").get(function () {
  const sanitizedName = this.name.toLowerCase().replace(' ', '_');
  return `../images/${sanitizedName}.webp`;
})

module.exports = mongoose.model("Character", CharacterSchema);
