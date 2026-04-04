import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiDoc, ApiDocSchema } from './api-doc.schema';
import { ApiDocsController } from './api-docs.controller';
import { ApiDocsService } from './api-docs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ApiDoc.name,
        schema: ApiDocSchema,
      },
    ]),
  ],
  controllers: [ApiDocsController],
  providers: [ApiDocsService],
  exports: [ApiDocsService],
})
export class ApiDocsModule {}
