import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SocialLinkDto {
  @IsString()
  platform: string;

  @IsUrl()
  url: string;
}

export class WalletDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  spend?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  withdrawable?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pending?: number;
}

export class CreateUserDto {
  @IsString()
  clerkId: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  socialLinks?: SocialLinkDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => WalletDto)
  wallet?: WalletDto;

  @IsOptional()
  @IsNumber()
  @Min(0)
  apiLimit?: number;

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
