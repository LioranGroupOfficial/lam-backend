import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ApiUsageDocument = ApiUsage & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'apiUsage',
})
export class ApiUsage {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Api', required: true })
  apiId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  ownerId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ApiKey', required: true })
  apiKeyId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, enum: ['SUCCESS', 'FAILED'] })
  status: string;

  @Prop({ type: Number, required: true, min: 0 })
  latency: number;

  @Prop({ type: Number, required: true, min: 0 })
  responseCode: number;

  @Prop({ type: Number, required: true, min: 0 })
  cost: number;

  @Prop({ type: Number, required: true, min: 0 })
  commission: number;

  @Prop({ type: Number, required: true, min: 0 })
  netToOwner: number;
}

export const ApiUsageSchema = SchemaFactory.createForClass(ApiUsage);
