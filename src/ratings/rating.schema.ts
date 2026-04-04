import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RatingDocument = Rating & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'ratings',
})
export class Rating {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Api', required: true })
  apiId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: Number, required: true, min: 1, max: 5 })
  rating: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
