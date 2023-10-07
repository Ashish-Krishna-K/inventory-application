import mongoose, { type InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

WeaponSchema.virtual('url').get(function () {
  return `/visions/${this.id}`;
});

interface WeaponModel extends InferSchemaType<typeof WeaponSchema> {
  url: string;
}

const Weapon = mongoose.model<WeaponModel>('Weapon', WeaponSchema);

export default Weapon;
