import { PartialType } from '@nestjs/mapped-types';
import { CreateConversionLogDto } from './create-conversion-log.dto';

export class UpdateConversionLogDto extends PartialType(CreateConversionLogDto) {}
