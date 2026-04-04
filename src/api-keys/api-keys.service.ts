import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from '../common/utils/mongo.util';
import { ApiKey, ApiKeyDocument } from './api-key.schema';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectModel(ApiKey.name)
    private readonly apiKeyModel: Model<ApiKeyDocument>,
  ) {}

  create(createApiKeyDto: CreateApiKeyDto) {
    return new this.apiKeyModel({
      ...createApiKeyDto,
      userId: toObjectId(createApiKeyDto.userId, 'userId'),
      permissions:
        createApiKeyDto.permissions?.map((permission) => ({
          ...permission,
          apiId: toObjectId(permission.apiId, 'apiId'),
        })) ?? [],
    }).save();
  }

  findAll(filters: { userId?: string; apiId?: string }) {
    const query: Record<string, unknown> = {};

    if (filters.userId) {
      query.userId = toObjectId(filters.userId, 'userId');
    }

    if (filters.apiId) {
      query['permissions.apiId'] = toObjectId(filters.apiId, 'apiId');
    }

    return this.apiKeyModel.find(query).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const apiKey = await this.apiKeyModel.findById(toObjectId(id));

    if (!apiKey) {
      throw new NotFoundException('API key not found');
    }

    return apiKey;
  }

  async update(id: string, updateApiKeyDto: UpdateApiKeyDto) {
    const payload = {
      ...updateApiKeyDto,
      ...(updateApiKeyDto.userId
        ? { userId: toObjectId(updateApiKeyDto.userId, 'userId') }
        : {}),
      ...(updateApiKeyDto.permissions
        ? {
            permissions: updateApiKeyDto.permissions.map((permission) => ({
              ...permission,
              apiId: toObjectId(permission.apiId, 'apiId'),
            })),
          }
        : {}),
    };

    const apiKey = await this.apiKeyModel.findByIdAndUpdate(
      toObjectId(id),
      payload as Record<string, unknown>,
      { new: true, runValidators: true },
    );

    if (!apiKey) {
      throw new NotFoundException('API key not found');
    }

    return apiKey;
  }

  async remove(id: string) {
    const apiKey = await this.apiKeyModel.findByIdAndDelete(toObjectId(id));

    if (!apiKey) {
      throw new NotFoundException('API key not found');
    }

    return { message: 'API key deleted successfully' };
  }
}
