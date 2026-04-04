import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WalletTransaction,
  WalletTransactionSchema,
} from './wallet-transaction.schema';
import { WalletTransactionsController } from './wallet-transactions.controller';
import { WalletTransactionsService } from './wallet-transactions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WalletTransaction.name,
        schema: WalletTransactionSchema,
      },
    ]),
  ],
  controllers: [WalletTransactionsController],
  providers: [WalletTransactionsService],
  exports: [WalletTransactionsService],
})
export class WalletTransactionsModule {}
