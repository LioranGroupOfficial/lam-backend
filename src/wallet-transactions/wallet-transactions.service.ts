import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from '../common/utils/mongo.util';
import { CreateWalletTransactionDto } from './dto/create-wallet-transaction.dto';
import { UpdateWalletTransactionDto } from './dto/update-wallet-transaction.dto';
import {
  WalletTransaction,
  WalletTransactionDocument,
} from './wallet-transaction.schema';

@Injectable()
export class WalletTransactionsService {
  constructor(
    @InjectModel(WalletTransaction.name)
    private readonly walletTransactionModel: Model<WalletTransactionDocument>,
  ) {}

  create(createWalletTransactionDto: CreateWalletTransactionDto) {
    return new this.walletTransactionModel({
      ...createWalletTransactionDto,
      userId: toObjectId(createWalletTransactionDto.userId, 'userId'),
      referenceId: toObjectId(
        createWalletTransactionDto.referenceId,
        'referenceId',
      ),
    }).save();
  }

  findAll(filters: { userId?: string; type?: string }) {
    const query: Record<string, unknown> = {};

    if (filters.userId) {
      query.userId = toObjectId(filters.userId, 'userId');
    }

    if (filters.type) {
      query.type = filters.type;
    }

    return this.walletTransactionModel.find(query).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const walletTransaction = await this.walletTransactionModel.findById(
      toObjectId(id),
    );

    if (!walletTransaction) {
      throw new NotFoundException('Wallet transaction not found');
    }

    return walletTransaction;
  }

  async update(
    id: string,
    updateWalletTransactionDto: UpdateWalletTransactionDto,
  ) {
    const payload = {
      ...updateWalletTransactionDto,
      ...(updateWalletTransactionDto.userId
        ? { userId: toObjectId(updateWalletTransactionDto.userId, 'userId') }
        : {}),
      ...(updateWalletTransactionDto.referenceId
        ? {
            referenceId: toObjectId(
              updateWalletTransactionDto.referenceId,
              'referenceId',
            ),
          }
        : {}),
    };

    const walletTransaction = await this.walletTransactionModel.findByIdAndUpdate(
      toObjectId(id),
      payload as Record<string, unknown>,
      { new: true, runValidators: true },
    );

    if (!walletTransaction) {
      throw new NotFoundException('Wallet transaction not found');
    }

    return walletTransaction;
  }

  async remove(id: string) {
    const walletTransaction = await this.walletTransactionModel.findByIdAndDelete(
      toObjectId(id),
    );

    if (!walletTransaction) {
      throw new NotFoundException('Wallet transaction not found');
    }

    return { message: 'Wallet transaction deleted successfully' };
  }
}
