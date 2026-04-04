import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toObjectId } from '../common/utils/mongo.util';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewDocument } from './review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  create(createReviewDto: CreateReviewDto) {
    return new this.reviewModel({
      ...createReviewDto,
      apiId: toObjectId(createReviewDto.apiId, 'apiId'),
      userId: toObjectId(createReviewDto.userId, 'userId'),
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

    return this.reviewModel.find(query).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const review = await this.reviewModel.findById(toObjectId(id));

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const payload = {
      ...updateReviewDto,
      ...(updateReviewDto.apiId
        ? { apiId: toObjectId(updateReviewDto.apiId, 'apiId') }
        : {}),
      ...(updateReviewDto.userId
        ? { userId: toObjectId(updateReviewDto.userId, 'userId') }
        : {}),
    };

    const review = await this.reviewModel.findByIdAndUpdate(
      toObjectId(id),
      payload as Record<string, unknown>,
      { new: true, runValidators: true },
    );

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async remove(id: string) {
    const review = await this.reviewModel.findByIdAndDelete(toObjectId(id));

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return { message: 'Review deleted successfully' };
  }
}
