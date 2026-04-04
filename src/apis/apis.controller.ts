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
import { Public } from '../decorators/public.decorator';
import { ApisService } from './apis.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Controller('apis')
export class ApisController {
  constructor(private readonly apisService: ApisService) {}

  @Post()
  create(@Body() createApiDto: CreateApiDto) {
    return this.apisService.create(createApiDto);
  }

  @Public()
  @Get()
  findAll(
    @Query('ownerId') ownerId?: string,
    @Query('categoryId') categoryId?: string,
    @Query('isActive') isActive?: string,
  ) {
    return this.apisService.findAll({ ownerId, categoryId, isActive });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apisService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApiDto: UpdateApiDto) {
    return this.apisService.update(id, updateApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apisService.remove(id);
  }
}
