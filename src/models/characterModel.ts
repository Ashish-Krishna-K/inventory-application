import mongoose, { type InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  _name: { type: String, required: true, lowercase: true },
  _rarity: { type: String, required: true, enum: ['5', '4'] },
  description: { type: String, required: true },
  vision: { type: Schema.Types.ObjectId, ref: 'Vision', required: true },
  weapon: { type: Schema.Types.ObjectId, ref: 'Weapon', required: true },
  imgPath: { type: String, required: true },
});

CharacterSchema.virtual('url').get(function () {
  return `/characters/${this.id}`;
});

CharacterSchema.virtual('name').get(function () {
  return this._name
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
});

CharacterSchema.virtual('rarity').get(function () {
  return `${this._rarity} star`;
});

interface CharacterModel extends InferSchemaType<typeof CharacterSchema> {
  url: string;
  name: string;
  rarity: string;
}

const Character = mongoose.model<CharacterModel>('Character', CharacterSchema);

export default Character;
