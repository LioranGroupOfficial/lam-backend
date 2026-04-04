import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ _id: false })
export class SocialLink {
  @Prop({ required: true })
  platform: string;

  @Prop({ required: true })
  url: string;
}

@Schema({ _id: false })
export class Wallet {
  @Prop({ type: Number, default: 0 })
  spend: number;

  @Prop({ type: Number, default: 0 })
  withdrawable: number;

  @Prop({ type: Number, default: 0 })
  pending: number;
}

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({ required: true, unique: true })
  clerkId: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, trim: true })
  username: string;

  @Prop()
  avatarUrl: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ type: [SocialLink], default: [] })
  socialLinks: SocialLink[];

  @Prop({ type: Wallet, default: {} })
  wallet: Wallet;

  @Prop({ type: Number, default: 1000 })
  apiLimit: number;

  @Prop({ default: false })
  banned: boolean;

  @Prop()
  banReason: string;

  @Prop({ default: false })
  suspended: boolean;

  @Prop()
  suspendedReason: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
