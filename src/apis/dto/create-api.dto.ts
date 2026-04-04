import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export enum ApiPricingModel {
  FIXED = 'FIXED',
}

export class CreateApiDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsMongoId()
  ownerId: string;

  @IsNumber()
  @Min(0)
  pricePerRequest: number;

  @IsOptional()
  @IsEnum(ApiPricingModel)
  pricingModel?: ApiPricingModel;

  @IsUrl()
  baseUrl: string;

  @IsNumber()
  @Min(0)
  timeout: number;

  @IsOptional()
  @IsObject()
  headersTemplate?: Record<string, unknown>;

  @IsMongoId()
  categoryId: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsString()
  testApiKey?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  views?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  likes?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weeklyViews?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weeklyLikes?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  avgRating?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalRatings?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

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
