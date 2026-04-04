import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from '../common/utils/mongo.util';
import { ConversionLog, ConversionLogDocument } from './conversion-log.schema';
import { CreateConversionLogDto } from './dto/create-conversion-log.dto';
import { UpdateConversionLogDto } from './dto/update-conversion-log.dto';

@Injectable()
export class ConversionLogsService {
  constructor(
    @InjectModel(ConversionLog.name)
    private readonly conversionLogModel: Model<ConversionLogDocument>,
  ) {}

  create(createConversionLogDto: CreateConversionLogDto) {
    return new this.conversionLogModel({
      ...createConversionLogDto,
      userId: toObjectId(createConversionLogDto.userId, 'userId'),
    }).save();
  }

  findAll(filters: { userId?: string; from?: string; to?: string }) {
    const query: Record<string, unknown> = {};

    if (filters.userId) {
      query.userId = toObjectId(filters.userId, 'userId');
    }

    if (filters.from) {
      query.from = filters.from;
    }

    if (filters.to) {
      query.to = filters.to;
    }

    return this.conversionLogModel.find(query).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const conversionLog = await this.conversionLogModel.findById(toObjectId(id));

    if (!conversionLog) {
      throw new NotFoundException('Conversion log not found');
    }

    return conversionLog;
  }

  async update(id: string, updateConversionLogDto: UpdateConversionLogDto) {
    const payload = {
      ...updateConversionLogDto,
      ...(updateConversionLogDto.userId
        ? { userId: toObjectId(updateConversionLogDto.userId, 'userId') }
        : {}),
    };

    const conversionLog = await this.conversionLogModel.findByIdAndUpdate(
      toObjectId(id),
      payload as Record<string, unknown>,
      { new: true, runValidators: true },
    );

    if (!conversionLog) {
      throw new NotFoundException('Conversion log not found');
    }

    return conversionLog;
  }

  async remove(id: string) {
    const conversionLog = await this.conversionLogModel.findByIdAndDelete(
      toObjectId(id),
    );

    if (!conversionLog) {
      throw new NotFoundException('Conversion log not found');
    }

    return { message: 'Conversion log deleted successfully' };
  }
}
