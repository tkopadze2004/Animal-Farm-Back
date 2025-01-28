import { model, Schema, Document } from 'mongoose';

export interface Pig extends Document {
  currentStatus: string; // 'start', 'happy', 'putin'
}

export const PigSchema = new Schema(
  {
    currentStatus: { type: String, required: true, default: 'start' },
  },
  {
    versionKey: false,
  },
);

export const pigModel = model<Pig>('pig', PigSchema);
