import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { toObjectId } from '../common/utils/mongo.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(toObjectId(id));

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findByClerkId(clerkId: string) {
    return this.userModel.findOne({ clerkId });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(
      toObjectId(id),
      updateUserDto,
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(toObjectId(id));

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { message: 'User deleted successfully' };
  }

  upsertFromClerk(data: {
    clerkId: string;
    email: string;
    username: string;
    avatarUrl?: string;
  }) {
    return this.userModel.findOneAndUpdate(
      { clerkId: data.clerkId },
      {
        ...data,
        $setOnInsert: {
          wallet: {
            spend: 0,
            withdrawable: 0,
            pending: 0,
          },
          apiLimit: 1000,
          banned: false,
          suspended: false,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );
  }
}
