import { IsEnum, IsMongoId, IsNumber, Min } from 'class-validator';

export enum WalletTransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
  CONVERSION = 'CONVERSION',
}

export class CreateWalletTransactionDto {
  @IsMongoId()
  userId: string;

  @IsEnum(WalletTransactionType)
  type: WalletTransactionType;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsNumber()
  @Min(0)
  fee: number;

  @IsNumber()
  @Min(0)
  netAmount: number;

  @IsMongoId()
  referenceId: string;
}
