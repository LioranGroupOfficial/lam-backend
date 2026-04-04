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
import { ApiUsageService } from './api-usage.service';
import { CreateApiUsageDto } from './dto/create-api-usage.dto';
import { UpdateApiUsageDto } from './dto/update-api-usage.dto';

@Controller('api-usage')
export class ApiUsageController {
  constructor(private readonly apiUsageService: ApiUsageService) {}

  @Post()
  create(@Body() createApiUsageDto: CreateApiUsageDto) {
    return this.apiUsageService.create(createApiUsageDto);
  }

  @Get()
  findAll(
    @Query('apiId') apiId?: string,
    @Query('userId') userId?: string,
    @Query('ownerId') ownerId?: string,
    @Query('apiKeyId') apiKeyId?: string,
    @Query('status') status?: string,
  ) {
    return this.apiUsageService.findAll({
      apiId,
      userId,
      ownerId,
      apiKeyId,
      status,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiUsageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApiUsageDto: UpdateApiUsageDto,
  ) {
    return this.apiUsageService.update(id, updateApiUsageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apiUsageService.remove(id);
  }
}
