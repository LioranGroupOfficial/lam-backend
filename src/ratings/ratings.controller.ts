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
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }

  @Public()
  @Get()
  findAll(@Query('apiId') apiId?: string, @Query('userId') userId?: string) {
    return this.ratingsService.findAll({ apiId, userId });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingsService.remove(id);
  }
}
