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
import { CourtLocationMapService } from './court-location-map.service';
import { CreateCourtLocationMapDto } from './dto/create-court-location-map.dto';
import { UpdateCourtLocationMapDto } from './dto/update-court-location-map.dto';

@Controller('court-location-map')
export class CourtLocationMapController {
  constructor(
    private readonly courtLocationMapService: CourtLocationMapService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCourtLocationMapDto: CreateCourtLocationMapDto) {
    return this.courtLocationMapService.create(createCourtLocationMapDto);
  }

  @Get()
  findAll() {
    return this.courtLocationMapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courtLocationMapService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourtLocationMapDto: UpdateCourtLocationMapDto,
  ) {
    return this.courtLocationMapService.update(+id, updateCourtLocationMapDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.courtLocationMapService.remove(+id);
  }
}
