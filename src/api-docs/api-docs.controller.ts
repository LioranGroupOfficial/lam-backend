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
import { ApiDocsService } from './api-docs.service';
import { CreateApiDocDto } from './dto/create-api-doc.dto';
import { UpdateApiDocDto } from './dto/update-api-doc.dto';

@Controller('api-docs')
export class ApiDocsController {
  constructor(private readonly apiDocsService: ApiDocsService) {}

  @Post()
  create(@Body() createApiDocDto: CreateApiDocDto) {
    return this.apiDocsService.create(createApiDocDto);
  }

  @Public()
  @Get()
  findAll(@Query('apiId') apiId?: string) {
    return this.apiDocsService.findAll(apiId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiDocsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApiDocDto: UpdateApiDocDto) {
    return this.apiDocsService.update(id, updateApiDocDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apiDocsService.remove(id);
  }
}
