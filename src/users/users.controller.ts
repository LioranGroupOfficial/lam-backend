import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { Throttle } from '@nestjs/throttler';
import { RATE_LIMIT } from '../config/constants';
import { Public } from '../decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Throttle({
    default: { limit: RATE_LIMIT.AUTH.LIMIT, ttl: RATE_LIMIT.AUTH.TTL },
  })
  @Get('me')
  getMe(@Req() req: Request) {
    const auth = (req as any).user;

    if (!auth?.id) {
      throw new NotFoundException('User not authenticated');
    }

    const email =
      auth.emailAddresses?.find(
        (entry: { id: string; emailAddress: string }) =>
          entry.id === auth.primaryEmailAddressId,
      )?.emailAddress ?? auth.emailAddresses?.[0]?.emailAddress;

    const nameFromProfile = [auth.firstName, auth.lastName]
      .filter(Boolean)
      .join(' ')
      .trim();
    const resolvedEmail = email ?? `${auth.id}@clerk.local`;
    const resolvedUsername =
      auth.username ||
      nameFromProfile ||
      resolvedEmail.split('@')[0] ||
      `user-${auth.id.slice(-6)}`;

    return this.usersService.upsertFromClerk({
      clerkId: auth.id,
      email: resolvedEmail,
      username: resolvedUsername,
      avatarUrl: auth.imageUrl,
    });
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Public()
  @Get('clerk/:clerkId')
  async findByClerkId(@Param('clerkId') clerkId: string) {
    const user = await this.usersService.findByClerkId(clerkId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
