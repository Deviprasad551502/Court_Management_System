import { Controller, Get, Post, Body } from '@nestjs/common';
import { CourtTypesService } from './court-types.service';
import { CreateCourtTypeDto } from './dto/create-court-type.dto';

@Controller('court-types')
export class CourtTypesController {
  constructor(private readonly service: CourtTypesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreateCourtTypeDto) {
    return this.service.create(dto);
  }
}
