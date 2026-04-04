import { IsEnum, IsMongoId, IsNumber, Min } from 'class-validator';

export enum ConversionWalletType {
  SPEND = 'SPEND',
  WITHDRAWABLE = 'WITHDRAWABLE',
}

export class CreateConversionLogDto {
  @IsMongoId()
  userId: string;

  @IsEnum(ConversionWalletType)
  from: ConversionWalletType;

  @IsEnum(ConversionWalletType)
  to: ConversionWalletType;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsNumber()
  @Min(0)
  fee: number;
}
