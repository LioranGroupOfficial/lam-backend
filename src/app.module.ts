import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ApiDocsModule } from './api-docs/api-docs.module';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { ApiUsageModule } from './api-usage/api-usage.module';
import { ApisModule } from './apis/apis.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClerkAuthGuard } from './auth/clerk-auth.guard';
import { CategoriesModule } from './categories/categories.module';
import { RATE_LIMIT } from './config/constants';
import { ConversionLogsModule } from './conversion-logs/conversion-logs.module';
import { ClerkClientProvider } from './providers/clerk-client.provider';
import { RatingsModule } from './ratings/ratings.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { WalletTransactionsModule } from './wallet-transactions/wallet-transactions.module';

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
    CategoriesModule,
    ApisModule,
    ApiDocsModule,
    ApiKeysModule,
    ApiUsageModule,
    WalletTransactionsModule,
    ConversionLogsModule,
    ReviewsModule,
    RatingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ClerkClientProvider,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
