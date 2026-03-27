import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createUser(data: {
    clerkId: string;
    email: string;
    firstName?: string;
    lastName?: string;
  }) {
    return this.userModel.create(data);
  }

  async findByClerkId(clerkId: string) {
    return this.userModel.findOne({ clerkId });
  }

  async getAllUsers() {
    return this.userModel.find().sort({ createdAt: -1 });
  }

  async upsertUser(data: {
    clerkId: string;
    email: string;
    firstName?: string;
    lastName?: string;
  }) {
    return this.userModel.findOneAndUpdate(
      { clerkId: data.clerkId },
      data,
      {
        new: true,
        upsert: true,
      },
    );
  }
}
