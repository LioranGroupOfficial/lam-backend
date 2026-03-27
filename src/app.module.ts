import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClerkClientProvider } from 'src/providers/clerk-client.provider';
import { AuthModule } from './auth/auth.module';
import { ClerkAuthGuard } from './auth/clerk-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
// import { ClerkWebhookController } from './webhooks/clerk-webhook.controller';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { RATE_LIMIT } from './config/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: RATE_LIMIT.DEFAULT.TTL,
          limit: RATE_LIMIT.DEFAULT.LIMIT,
        },
      ],
    }),
    // Async configuration to inject the ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const isProduction =
          configService.get<string>('PRODUCTION') === 'true';

        return {
          uri: configService.get<string>('MONGODB_URI'),
          dbName: isProduction ? 'production' : 'test',
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [
    AppController,
    // ClerkWebhookController
  ],
  providers: [
    AppService,
    ClerkClientProvider, {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    }, {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule { }
