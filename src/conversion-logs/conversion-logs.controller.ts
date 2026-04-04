import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ConversionLogsService } from './conversion-logs.service';
import { CreateConversionLogDto } from './dto/create-conversion-log.dto';
import { UpdateConversionLogDto } from './dto/update-conversion-log.dto';

@Controller('conversion-logs')
export class ConversionLogsController {
  constructor(private readonly conversionLogsService: ConversionLogsService) {}

  @Post()
  create(@Body() createConversionLogDto: CreateConversionLogDto) {
    return this.conversionLogsService.create(createConversionLogDto);
  }

  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.conversionLogsService.findAll({ userId, from, to });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversionLogsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConversionLogDto: UpdateConversionLogDto,
  ) {
    return this.conversionLogsService.update(id, updateConversionLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversionLogsService.remove(id);
  }
}
