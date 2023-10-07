import mongoose, { type InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  vision: { type: Schema.Types.ObjectId, ref: 'Vision', required: true },
  _rarity: { type: String, required: true, enum: ['5', '4'] },
  weapon: { type: Schema.Types.ObjectId, ref: 'Weapon', required: true },
});

CharacterSchema.virtual('url').get(function () {
  return `/characters/${this.id}`;
});

CharacterSchema.virtual('rarity').get(function () {
  return `${this._rarity} star`;
});

CharacterSchema.virtual('imgName').get(function () {
  let url = '';

  const nameArray = this.name.split(' ');
  if (nameArray.length < 2) url = this.name.toLowerCase();
  url = nameArray.map((word) => word.toLowerCase()).join('_');
  return url;
});

interface CharacterModel extends InferSchemaType<typeof CharacterSchema> {
  url: string;
  rarity: string;
  imgName: string;
}

const Character = mongoose.model<CharacterModel>('Character', CharacterSchema);

export default Character;
