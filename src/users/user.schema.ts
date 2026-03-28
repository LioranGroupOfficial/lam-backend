import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ _id: false }) // subdocument, no separate _id
class Wallet {
  @Prop({ type: Number, default: 0 })
  earn: number; // money earned (₹)

  @Prop({ type: Number, default: 0 })
  spend: number; // money available to spend (₹)
}

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({ required: true, unique: true })
  clerkId: string;

  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ type: Wallet, default: {} })
  wallet: Wallet;
}

export const UserSchema = SchemaFactory.createForClass(User);