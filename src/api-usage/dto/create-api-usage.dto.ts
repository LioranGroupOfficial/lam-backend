import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export enum ApiUsageStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export class CreateApiUsageDto {
  @IsMongoId()
  apiId: string;

  @IsMongoId()
  userId: string;

  @IsMongoId()
  ownerId: string;

  @IsMongoId()
  apiKeyId: string;

  @IsEnum(ApiUsageStatus)
  status: ApiUsageStatus;

  @IsNumber()
  @Min(0)
  latency: number;

  @IsNumber()
  @Min(0)
  responseCode: number;

  @IsNumber()
  @Min(0)
  cost: number;

  @IsNumber()
  @Min(0)
  commission: number;

  @IsNumber()
  @Min(0)
  netToOwner: number;
}
