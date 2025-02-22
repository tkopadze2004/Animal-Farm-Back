import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Pig  {
  @Prop({ required: true, default: 'start' })
  pigStatus: string;
}

export const PigSchema = SchemaFactory.createForClass(Pig);
