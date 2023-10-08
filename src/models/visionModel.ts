import mongoose, { type InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const VisionSchema = new Schema({
  _name: { type: String, required: true, lowercase: true },
  description: { type: String, required: true },
});

VisionSchema.virtual('url').get(function () {
  return `/visions/${this.id}`;
});

VisionSchema.virtual('name').get(function () {
  return `${this._name[0].toUpperCase()}${this._name.slice(1)}`;
});

interface VisionModel extends InferSchemaType<typeof VisionSchema> {
  url: string;
  name: string;
}

const Vision = mongoose.model<VisionModel>('Vision', VisionSchema);

export default Vision;
