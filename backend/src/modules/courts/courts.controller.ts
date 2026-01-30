import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CourtsService } from './courts.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';

@Controller('api/courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCourtDto: CreateCourtDto) {
    return this.courtsService.create(createCourtDto);
  }

  @Get()
  findAll(@Query('stateKey') stateKey?: string) {
    if (stateKey) {
      return this.courtsService.findByStateKey(stateKey);
    }
    return this.courtsService.findAll();
  }

  @Get('by-state/:stateKey')
  findByStateKey(@Param('stateKey') stateKey: string) {
    return this.courtsService.findByStateKey(stateKey);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courtsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourtDto: UpdateCourtDto) {
    return this.courtsService.update(id, updateCourtDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.courtsService.remove(id);
  }
}
