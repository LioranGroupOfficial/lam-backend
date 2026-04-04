import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ApiKeyPermissionDto {
  @IsMongoId()
  apiId: string;

  @IsNumber()
  @Min(0)
  maxCostPerRequest: number;

  @IsNumber()
  @Min(0)
  rpm: number;
}

export class CreateApiKeyDto {
  @IsMongoId()
  userId: string;

  @IsString()
  apiKey: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApiKeyPermissionDto)
  permissions?: ApiKeyPermissionDto[];

  @IsOptional()
  @IsBoolean()
  banned?: boolean;

  @IsOptional()
  @IsString()
  banReason?: string;

  @IsOptional()
  @IsBoolean()
  suspended?: boolean;

  @IsOptional()
  @IsString()
  suspendedReason?: string;
}
