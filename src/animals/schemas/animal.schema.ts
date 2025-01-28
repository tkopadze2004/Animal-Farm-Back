import { model, Schema, Document } from 'mongoose';

export interface Animal extends Document {
  name: string;
  animalType: string;
  foodType: string;
  thanksCount: number;
}

export const AnimalSchema = new Schema(
  {
    name: { type: String, required: true },
    animalType: { type: String, required: true },
    foodType: { type: String, required: true },
    thanksCount: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  },
);

export const AnimalModel = model<Animal>('Animal', AnimalSchema);
