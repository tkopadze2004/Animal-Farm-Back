import { model, Schema, Document } from 'mongoose';

export interface Pig extends Document {
  pigStatus: string;
}

export const PigSchema = new Schema(
  {
    pigStatus: { type: String, required: true, default: 'start' },
  },
  {
    versionKey: false,
  },
);

export const pigModel = model<Pig>('pig', PigSchema);
