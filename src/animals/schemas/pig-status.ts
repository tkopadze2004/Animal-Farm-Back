import { model, Schema, Document } from 'mongoose';

export interface PigStatus extends Document {
  status: string;
}

export const PigStatusSchema = new Schema({
  status: { type: String, required: true, default: 'initial' },
});

export const PigModel = model<PigStatus>('PigStatus', PigStatusSchema);
