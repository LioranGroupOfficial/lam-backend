import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('webhooks/clerk')
export class ClerkWebhookController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async handleWebhook(@Body() body: any) {
    const eventType = body.type;

    console.log('Received Clerk webhook:', eventType);

    if (eventType === 'user.created') {
      const user = body.data;

      await this.usersService.upsertUser({
        clerkId: user.id,
        email: user.email_addresses[0].email_address,
        firstName: user.first_name,
        lastName: user.last_name,
      });

      console.log('User created in MongoDB');
    }

    return { received: true };
  }
}