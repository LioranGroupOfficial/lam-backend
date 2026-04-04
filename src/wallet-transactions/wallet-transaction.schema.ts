import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type WalletTransactionDocument = WalletTransaction & Document;

@Schema({
  timestamps: { createdAt: true, updatedAt: false },
  collection: 'walletTransactions',
})
export class WalletTransaction {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({
    required: true,
    enum: ['DEBIT', 'CREDIT', 'WITHDRAW', 'DEPOSIT', 'CONVERSION'],
  })
  type: string;

  @Prop({ type: Number, required: true, min: 0 })
  amount: number;

  @Prop({ type: Number, required: true, min: 0 })
  fee: number;

  @Prop({ type: Number, required: true, min: 0 })
  netAmount: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  referenceId: MongooseSchema.Types.ObjectId;
}

export const WalletTransactionSchema =
  SchemaFactory.createForClass(WalletTransaction);
