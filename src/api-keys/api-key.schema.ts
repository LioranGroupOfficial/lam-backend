import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ApiKeyDocument = ApiKey & Document;

@Schema({ _id: false })
export class ApiKeyPermission {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Api', required: true })
  apiId: MongooseSchema.Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  maxCostPerRequest: number;

  @Prop({ type: Number, required: true, min: 0 })
  rpm: number;
}

@Schema({
  timestamps: true,
  collection: 'apiKeys',
})
export class ApiKey {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  apiKey: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [ApiKeyPermission], default: [] })
  permissions: ApiKeyPermission[];

  @Prop({ default: false })
  banned: boolean;

  @Prop()
  banReason: string;

  @Prop({ default: false })
  suspended: boolean;

  @Prop()
  suspendedReason: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
