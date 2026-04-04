import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ConversionLogDocument = ConversionLog & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'conversionLogs',
})
export class ConversionLog {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, enum: ['SPEND', 'WITHDRAWABLE'] })
  from: string;

  @Prop({ required: true, enum: ['SPEND', 'WITHDRAWABLE'] })
  to: string;

  @Prop({ type: Number, required: true, min: 0 })
  amount: number;

  @Prop({ type: Number, required: true, min: 0 })
  fee: number;
}

export const ConversionLogSchema = SchemaFactory.createForClass(ConversionLog);
