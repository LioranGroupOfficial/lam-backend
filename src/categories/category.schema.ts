import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'categories',
})
export class Category {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
