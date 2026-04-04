import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiUsage, ApiUsageSchema } from './api-usage.schema';
import { ApiUsageController } from './api-usage.controller';
import { ApiUsageService } from './api-usage.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ApiUsage.name,
        schema: ApiUsageSchema,
      },
    ]),
  ],
  controllers: [ApiUsageController],
  providers: [ApiUsageService],
  exports: [ApiUsageService],
})
export class ApiUsageModule {}
