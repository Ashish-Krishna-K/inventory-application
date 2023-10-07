import mongoose, { type InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const VisionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

VisionSchema.virtual('url').get(function () {
  return `/visions/${this.id}`;
});

interface VisionModel extends InferSchemaType<typeof VisionSchema> {
  url: string;
}

const Vision = mongoose.model<VisionModel>('Vision', VisionSchema);

export default Vision;
