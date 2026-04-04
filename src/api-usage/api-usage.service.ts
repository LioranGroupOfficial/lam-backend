import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from '../common/utils/mongo.util';
import { ApiUsage, ApiUsageDocument } from './api-usage.schema';
import { CreateApiUsageDto } from './dto/create-api-usage.dto';
import { UpdateApiUsageDto } from './dto/update-api-usage.dto';

@Injectable()
export class ApiUsageService {
  constructor(
    @InjectModel(ApiUsage.name)
    private readonly apiUsageModel: Model<ApiUsageDocument>,
  ) {}

  create(createApiUsageDto: CreateApiUsageDto) {
    return new this.apiUsageModel({
      ...createApiUsageDto,
      apiId: toObjectId(createApiUsageDto.apiId, 'apiId'),
      userId: toObjectId(createApiUsageDto.userId, 'userId'),
      ownerId: toObjectId(createApiUsageDto.ownerId, 'ownerId'),
      apiKeyId: toObjectId(createApiUsageDto.apiKeyId, 'apiKeyId'),
    }).save();
  }

  findAll(filters: {
    apiId?: string;
    userId?: string;
    ownerId?: string;
    apiKeyId?: string;
    status?: string;
  }) {
    const query: Record<string, unknown> = {};

    if (filters.apiId) {
      query.apiId = toObjectId(filters.apiId, 'apiId');
    }

    if (filters.userId) {
      query.userId = toObjectId(filters.userId, 'userId');
    }

    if (filters.ownerId) {
      query.ownerId = toObjectId(filters.ownerId, 'ownerId');
    }

    if (filters.apiKeyId) {
      query.apiKeyId = toObjectId(filters.apiKeyId, 'apiKeyId');
    }

    if (filters.status) {
      query.status = filters.status;
    }

    return this.apiUsageModel.find(query).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const apiUsage = await this.apiUsageModel.findById(toObjectId(id));

    if (!apiUsage) {
      throw new NotFoundException('API usage not found');
    }

    return apiUsage;
  }

  async update(id: string, updateApiUsageDto: UpdateApiUsageDto) {
    const payload = {
      ...updateApiUsageDto,
      ...(updateApiUsageDto.apiId
        ? { apiId: toObjectId(updateApiUsageDto.apiId, 'apiId') }
        : {}),
      ...(updateApiUsageDto.userId
        ? { userId: toObjectId(updateApiUsageDto.userId, 'userId') }
        : {}),
      ...(updateApiUsageDto.ownerId
        ? { ownerId: toObjectId(updateApiUsageDto.ownerId, 'ownerId') }
        : {}),
      ...(updateApiUsageDto.apiKeyId
        ? { apiKeyId: toObjectId(updateApiUsageDto.apiKeyId, 'apiKeyId') }
        : {}),
    };

    const apiUsage = await this.apiUsageModel.findByIdAndUpdate(
      toObjectId(id),
      payload as Record<string, unknown>,
      { new: true, runValidators: true },
    );

    if (!apiUsage) {
      throw new NotFoundException('API usage not found');
    }

    return apiUsage;
  }

  async remove(id: string) {
    const apiUsage = await this.apiUsageModel.findByIdAndDelete(toObjectId(id));

    if (!apiUsage) {
      throw new NotFoundException('API usage not found');
    }

    return { message: 'API usage deleted successfully' };
  }
}
