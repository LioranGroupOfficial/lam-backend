import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Api, ApiSchema } from './api.schema';
import { ApisController } from './apis.controller';
import { ApisService } from './apis.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Api.name,
        schema: ApiSchema,
      },
    ]),
  ],
  controllers: [ApisController],
  providers: [ApisService],
  exports: [ApisService],
})
export class ApisModule {}
