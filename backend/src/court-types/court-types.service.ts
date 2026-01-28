import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourtType } from './court-type.entity';
import { CreateCourtTypeDto } from './dto/create-court-type.dto';

@Injectable()
export class CourtTypesService {
  constructor(
    @InjectRepository(CourtType)
    private repo: Repository<CourtType>,
  ) {}

  create(dto: CreateCourtTypeDto) {
    return this.repo.save({ name: dto.name });
  }

  findAll() {
    return this.repo.find();
  }
}
