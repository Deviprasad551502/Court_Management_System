import { Controller, Get, Post, Body } from '@nestjs/common';
import { CourtTypesService } from './court-types.service';
import { CreateCourtTypeDto } from './dto/create-court-type.dto';

@Controller('api/court-types')
export class CourtTypesController {
  constructor(private service: CourtTypesService) {}

  @Post()
  create(@Body() dto: CreateCourtTypeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
