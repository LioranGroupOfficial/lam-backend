import {
  Controller,
  Get,
  Req,
  Param,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';
import { UsersService } from './users.service';
import { Throttle } from '@nestjs/throttler';
import { RATE_LIMIT } from '../config/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * GET /users/me
   *
   * First login:
   *   → creates user in MongoDB
   * Next login:
   *   → returns existing user
   *
   * Optimized: Only updates MongoDB if data has changed
   */
  @Throttle({ default: { limit: RATE_LIMIT.AUTH.LIMIT, ttl: RATE_LIMIT.AUTH.TTL } }) // Limit to 5 requests per minute for this endpoint
  @Get('me')
  async getMe(@Req() req: Request) {
    const auth = (req as any).user;

    if (!auth?.id) {
      throw new NotFoundException('User not authenticated');
    }

    const clerkId = auth.id;
    const email = auth.sessionClaims?.email;
    const firstName = auth.sessionClaims?.firstName;
    const lastName = auth.sessionClaims?.lastName;

    // Check if user already exists
    const existingUser = await this.usersService.findByClerkId(clerkId);

    let user;
    if (!existingUser) {
      // First login → create user
      user = await this.usersService.upsertUser({
        clerkId,
        email,
        firstName,
        lastName,
      });
      console.log(`Created new user: ${clerkId}`);
    } else {
      // Only update if any field changed
      const needsUpdate =
        existingUser.email !== email ||
        existingUser.firstName !== firstName ||
        existingUser.lastName !== lastName;

      if (needsUpdate) {
        user = await this.usersService.upsertUser({
          clerkId,
          email,
          firstName,
          lastName,
        });
        console.log(`Updated user: ${clerkId}`);
      } else {
        user = existingUser;
      }
    }

    return user;
  }

  /**
   * GET /users/:clerkId
   * Example: /users/user_abc123
   */
  @Get(':clerkId')
  async getUserByClerkId(@Param('clerkId') clerkId: string) {
    const user = await this.usersService.findByClerkId(clerkId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Health check / debug
   */
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}