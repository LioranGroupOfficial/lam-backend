import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ApiDocArgumentDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsBoolean()
  required: boolean;

  @IsString()
  description: string;

  @IsOptional()
  example?: unknown;
}

export class ApiDocRouteDto {
  @IsString()
  path: string;

  @IsString()
  method: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApiDocArgumentDto)
  arguments?: ApiDocArgumentDto[];

  @IsOptional()
  @IsObject()
  requestExample?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  responseExample?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  errorExample?: Record<string, unknown>;
}

export class CreateApiDocDto {
  @IsMongoId()
  apiId: string;

  @IsString()
  baseUrl: string;

  @IsString()
  authType: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsObject()
  headers?: Record<string, unknown>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApiDocRouteDto)
  routes: ApiDocRouteDto[];
}
