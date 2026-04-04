import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from '../common/utils/mongo.util';
import { Api, ApiDocument } from './api.schema';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Injectable()
export class ApisService {
  constructor(
    @InjectModel(Api.name)
    private readonly apiModel: Model<ApiDocument>,
  ) {}

  create(createApiDto: CreateApiDto) {
    return new this.apiModel({
      ...createApiDto,
      ownerId: toObjectId(createApiDto.ownerId, 'ownerId'),
      categoryId: toObjectId(createApiDto.categoryId, 'categoryId'),
    }).save();
  }

  findAll(filters: {
    ownerId?: string;
    categoryId?: string;
    isActive?: string;
  }) {
    const query: Record<string, unknown> = {};

    if (filters.ownerId) {
      query.ownerId = toObjectId(filters.ownerId, 'ownerId');
    }

    if (filters.categoryId) {
      query.categoryId = toObjectId(filters.categoryId, 'categoryId');
    }

    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive === 'true';
    }

    return this.apiModel.find(query).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const api = await this.apiModel.findById(toObjectId(id));

    if (!api) {
      throw new NotFoundException('API not found');
    }

    return api;
  }

  async update(id: string, updateApiDto: UpdateApiDto) {
    const payload = {
      ...updateApiDto,
      ...(updateApiDto.ownerId
        ? { ownerId: toObjectId(updateApiDto.ownerId, 'ownerId') }
        : {}),
      ...(updateApiDto.categoryId
        ? { categoryId: toObjectId(updateApiDto.categoryId, 'categoryId') }
        : {}),
    };

    const api = await this.apiModel.findByIdAndUpdate(
      toObjectId(id),
      payload as Record<string, unknown>,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!api) {
      throw new NotFoundException('API not found');
    }

    return api;
  }

  async remove(id: string) {
    const api = await this.apiModel.findByIdAndDelete(toObjectId(id));

    if (!api) {
      throw new NotFoundException('API not found');
    }

    return { message: 'API deleted successfully' };
  }
}
