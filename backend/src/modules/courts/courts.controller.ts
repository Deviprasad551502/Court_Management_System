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
  UseGuards,
  Request,
} from '@nestjs/common';
import { CourtsService } from './courts.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  // CREATE - ADMIN ONLY
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCourtDto: CreateCourtDto, @Request() req) {
    console.log(`Court created by admin: ${req.user.email} (ID: ${req.user.id})`);
    return this.courtsService.create(createCourtDto);
  }

  // READ - PUBLIC (Anyone can view courts list)
  @Get()
  findAll(@Query('stateKey') stateKey?: string) {
    if (stateKey) {
      return this.courtsService.findByStateKey(stateKey);
    }
    return this.courtsService.findAll();
  }

  // READ - PUBLIC (Anyone can view courts by state)
  @Get('by-state/:stateKey')
  findByStateKey(@Param('stateKey') stateKey: string) {
    return this.courtsService.findByStateKey(stateKey);
  }

  // READ - PUBLIC (Anyone can view a specific court)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courtsService.findOne(id);
  }

  // UPDATE - ADMIN ONLY
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateCourtDto: UpdateCourtDto,
    @Request() req,
  ) {
    console.log(`Court ${id} updated by admin: ${req.user.email} (ID: ${req.user.id})`);
    return this.courtsService.update(id, updateCourtDto);
  }

  // DELETE - ADMIN ONLY
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Request() req) {
    console.log(`Court ${id} deleted by admin: ${req.user.email} (ID: ${req.user.id})`);
    return this.courtsService.remove(id);
  }
}
