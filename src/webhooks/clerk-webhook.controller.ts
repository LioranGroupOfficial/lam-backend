import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('webhooks/clerk')
export class ClerkWebhookController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async handleWebhook(@Body() body: any) {
    const eventType = body.type;

    if (eventType === 'user.created') {
      const user = body.data;
      const email =
        user.email_addresses?.[0]?.email_address ?? `${user.id}@clerk.local`;
      const username =
        user.username ||
        [user.first_name, user.last_name].filter(Boolean).join(' ').trim() ||
        email.split('@')[0] ||
        `user-${user.id.slice(-6)}`;

      await this.usersService.upsertFromClerk({
        clerkId: user.id,
        email,
        username,
        avatarUrl: user.image_url,
      });
    }

    return { received: true };
  }
}
