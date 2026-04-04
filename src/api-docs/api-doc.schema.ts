import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ApiDocDocument = ApiDoc & Document;

@Schema({ _id: false })
export class ApiDocArgument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  required: boolean;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  example: unknown;
}

@Schema({ _id: false })
export class ApiDocRoute {
  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [ApiDocArgument], default: [] })
  arguments: ApiDocArgument[];

  @Prop({ type: MongooseSchema.Types.Mixed })
  requestExample: Record<string, unknown>;

  @Prop({ type: MongooseSchema.Types.Mixed })
  responseExample: Record<string, unknown>;

  @Prop({ type: MongooseSchema.Types.Mixed })
  errorExample: Record<string, unknown>;
}

@Schema({
  timestamps: true,
  collection: 'apiDocs',
})
export class ApiDoc {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Api', required: true })
  apiId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  baseUrl: string;

  @Prop({ required: true })
  authType: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  headers: Record<string, unknown>;

  @Prop({ type: [ApiDocRoute], default: [] })
  routes: ApiDocRoute[];
}

export const ApiDocSchema = SchemaFactory.createForClass(ApiDoc);
