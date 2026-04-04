import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from '../common/utils/mongo.util';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating, RatingDocument } from './rating.schema';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,
  ) {}

  create(createRatingDto: CreateRatingDto) {
    return new this.ratingModel({
      ...createRatingDto,
      apiId: toObjectId(createRatingDto.apiId, 'apiId'),
      userId: toObjectId(createRatingDto.userId, 'userId'),
    }).save();
  }

  findAll(filters: { apiId?: string; userId?: string }) {
    const query: Record<string, unknown> = {};

    if (filters.apiId) {
      query.apiId = toObjectId(filters.apiId, 'apiId');
    }

    if (filters.userId) {
      query.userId = toObjectId(filters.userId, 'userId');
    }

    return this.ratingModel.find(query).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const rating = await this.ratingModel.findById(toObjectId(id));

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    return rating;
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const payload = {
      ...updateRatingDto,
      ...(updateRatingDto.apiId
        ? { apiId: toObjectId(updateRatingDto.apiId, 'apiId') }
        : {}),
      ...(updateRatingDto.userId
        ? { userId: toObjectId(updateRatingDto.userId, 'userId') }
        : {}),
    };

    const rating = await this.ratingModel.findByIdAndUpdate(
      toObjectId(id),
      payload as Record<string, unknown>,
      { new: true, runValidators: true },
    );

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    return rating;
  }

  async remove(id: string) {
    const rating = await this.ratingModel.findByIdAndDelete(toObjectId(id));

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    return { message: 'Rating deleted successfully' };
  }
}
