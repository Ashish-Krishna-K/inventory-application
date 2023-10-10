import mongoose, { type InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
  _name: { type: String, required: true, lowercase: true },
});

WeaponSchema.virtual('url').get(function () {
  return `/weapons/${this.id}`;
});

WeaponSchema.virtual('name').get(function () {
  // Capitalize every word in the name
  return this._name
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');
});

interface WeaponModel extends InferSchemaType<typeof WeaponSchema> {
  url: string;
  name: string;
}

const Weapon = mongoose.model<WeaponModel>('Weapon', WeaponSchema);

export default Weapon;
