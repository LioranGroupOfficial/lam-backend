// src/auth/auth.controller.ts

import type { User } from '@clerk/backend';
import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  @Get('me')
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}
