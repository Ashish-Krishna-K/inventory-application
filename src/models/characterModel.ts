import mongoose, { type InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  vision: { type: Schema.Types.ObjectId, ref: 'Vision', required: true },
  _rarity: { type: String, required: true, enum: ['5', '4'] },
  _weapon: { type: String, required: true, enum: ['BOW', 'CATALYST', 'CLAYMORE', 'SWORD', 'POLEARM'] },
});

CharacterSchema.virtual('url').get(function () {
  return `/character/${this.id}`;
});

CharacterSchema.virtual('rarity').get(function () {
  return `${this._rarity} star`;
});

CharacterSchema.virtual('weapon').get(function () {
  return `${this._weapon[0]}${this._weapon.slice(1).toLowerCase()}`;
});

interface CharacterModel extends InferSchemaType<typeof CharacterSchema> {
  url: string;
  rarity: string;
  weapon: string;
}

const Character = mongoose.model<CharacterModel>('Character', CharacterSchema);

export default Character;
