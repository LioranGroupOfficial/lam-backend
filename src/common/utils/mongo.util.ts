import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export const toObjectId = (value: string, fieldName = 'id') => {
  if (!Types.ObjectId.isValid(value)) {
    throw new BadRequestException(`Invalid ${fieldName}`);
  }

  return new Types.ObjectId(value);
};
