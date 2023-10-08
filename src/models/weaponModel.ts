import mongoose, { type InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
  _name: { type: String, required: true, lowercase: true },
});

WeaponSchema.virtual('url').get(function () {
  return `/visions/${this.id}`;
});

WeaponSchema.virtual('name').get(function () {
  return `${this._name[0].toUpperCase()}${this._name.slice(1)}`;
});

interface WeaponModel extends InferSchemaType<typeof WeaponSchema> {
  url: string;
  name: string;
}

const Weapon = mongoose.model<WeaponModel>('Weapon', WeaponSchema);

export default Weapon;
