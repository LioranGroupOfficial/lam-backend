import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversionLog, ConversionLogSchema } from './conversion-log.schema';
import { ConversionLogsController } from './conversion-logs.controller';
import { ConversionLogsService } from './conversion-logs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ConversionLog.name,
        schema: ConversionLogSchema,
      },
    ]),
  ],
  controllers: [ConversionLogsController],
  providers: [ConversionLogsService],
  exports: [ConversionLogsService],
})
export class ConversionLogsModule {}
