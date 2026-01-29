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
} from '@nestjs/common';
import { CourtTypesService } from './court-types.service';
import { CreateCourtTypeDto } from './dto/create-court-type.dto';
import { UpdateCourtTypeDto } from './dto/update-court-type.dto';

@Controller('api/court-types')
export class CourtTypesController {
  constructor(private readonly courtTypesService: CourtTypesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCourtTypeDto: CreateCourtTypeDto) {
    return this.courtTypesService.create(createCourtTypeDto);
  }

  @Get()
  findAll() {
    return this.courtTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courtTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourtTypeDto: UpdateCourtTypeDto,
  ) {
    return this.courtTypesService.update(id, updateCourtTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.courtTypesService.remove(id);
  }
}
