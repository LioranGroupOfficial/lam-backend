import { PartialType } from '@nestjs/mapped-types';
import { CreateApiUsageDto } from './create-api-usage.dto';

export class UpdateApiUsageDto extends PartialType(CreateApiUsageDto) {}
