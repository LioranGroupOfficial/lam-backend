import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { toObjectId } from '../common/utils/mongo.util';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(toObjectId(id));

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(
      toObjectId(id),
      updateCategoryDto,
      { new: true, runValidators: true },
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(toObjectId(id));

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return { message: 'Category deleted successfully' };
  }
}
