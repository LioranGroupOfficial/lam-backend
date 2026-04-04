import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from '../common/utils/mongo.util';
import { ApiDoc, ApiDocDocument } from './api-doc.schema';
import { CreateApiDocDto } from './dto/create-api-doc.dto';
import { UpdateApiDocDto } from './dto/update-api-doc.dto';

@Injectable()
export class ApiDocsService {
  constructor(
    @InjectModel(ApiDoc.name)
    private readonly apiDocModel: Model<ApiDocDocument>,
  ) {}

  create(createApiDocDto: CreateApiDocDto) {
    return new this.apiDocModel({
      ...createApiDocDto,
      apiId: toObjectId(createApiDocDto.apiId, 'apiId'),
    }).save();
  }

  findAll(apiId?: string) {
    const query: Record<string, unknown> = {};

    if (apiId) {
      query.apiId = toObjectId(apiId, 'apiId');
    }

    return this.apiDocModel.find(query).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const apiDoc = await this.apiDocModel.findById(toObjectId(id));

    if (!apiDoc) {
      throw new NotFoundException('API doc not found');
    }

    return apiDoc;
  }

  async update(id: string, updateApiDocDto: UpdateApiDocDto) {
    const payload = {
      ...updateApiDocDto,
      ...(updateApiDocDto.apiId
        ? { apiId: toObjectId(updateApiDocDto.apiId, 'apiId') }
        : {}),
    };

    const apiDoc = await this.apiDocModel.findByIdAndUpdate(
      toObjectId(id),
      payload as Record<string, unknown>,
      { new: true, runValidators: true },
    );

    if (!apiDoc) {
      throw new NotFoundException('API doc not found');
    }

    return apiDoc;
  }

  async remove(id: string) {
    const apiDoc = await this.apiDocModel.findByIdAndDelete(toObjectId(id));

    if (!apiDoc) {
      throw new NotFoundException('API doc not found');
    }

    return { message: 'API doc deleted successfully' };
  }
}
