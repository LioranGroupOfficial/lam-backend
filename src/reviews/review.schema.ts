import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'reviews',
})
export class Review {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Api', required: true })
  apiId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  content: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
