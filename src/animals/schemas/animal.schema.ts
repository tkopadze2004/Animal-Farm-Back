import { model, Schema, Document } from 'mongoose';

export interface Animal extends Document {
  name: string;
  type: string;
  thanksCount: number;
}

export const AnimalSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  thanksCount: { type: Number, default: 0 },
});

export const AnimalModel = model<Animal>('Animal', AnimalSchema);
