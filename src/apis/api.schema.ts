import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ApiDocument = Api & Document;

@Schema({
  timestamps: true,
  collection: 'apis',
})
export class Api {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  ownerId: MongooseSchema.Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  pricePerRequest: number;

  @Prop({ default: 'FIXED' })
  pricingModel: string;

  @Prop({ required: true })
  baseUrl: string;

  @Prop({ type: Number, required: true, min: 0 })
  timeout: number;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  headersTemplate: Record<string, unknown>;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
  categoryId: MongooseSchema.Types.ObjectId;

  @Prop()
  image: string;

  @Prop()
  testApiKey: string;

  @Prop({ type: Number, default: 0 })
  views: number;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ type: Number, default: 0 })
  weeklyViews: number;

  @Prop({ type: Number, default: 0 })
  weeklyLikes: number;

  @Prop({ type: Number, default: 0 })
  avgRating: number;

  @Prop({ type: Number, default: 0 })
  totalRatings: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  banned: boolean;

  @Prop()
  banReason: string;

  @Prop({ default: false })
  suspended: boolean;

  @Prop()
  suspendedReason: string;
}

export const ApiSchema = SchemaFactory.createForClass(Api);
