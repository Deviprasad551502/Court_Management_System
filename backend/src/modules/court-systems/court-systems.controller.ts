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
import { CourtSystemsService } from './court-systems.service';
import { CreateCourtSystemDto } from './dto/create-court-system.dto';
import { UpdateCourtSystemDto } from './dto/update-court-system.dto';

@Controller('court-systems')
export class CourtSystemsController {
  constructor(private readonly courtSystemsService: CourtSystemsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCourtSystemDto: CreateCourtSystemDto) {
    return this.courtSystemsService.create(createCourtSystemDto);
  }

  @Get()
  findAll() {
    return this.courtSystemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courtSystemsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourtSystemDto: UpdateCourtSystemDto,
  ) {
    return this.courtSystemsService.update(id, updateCourtSystemDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.courtSystemsService.remove(id);
  }
}
