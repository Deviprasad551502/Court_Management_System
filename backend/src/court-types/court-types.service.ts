import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourtType } from './court-type.entity';
import { CreateCourtTypeDto } from './dto/create-court-type.dto';

@Injectable()
export class CourtTypesService {
  constructor(
    @InjectRepository(CourtType)
    private readonly repo: Repository<CourtType>,
  ) {}

  async findAll(): Promise<CourtType[]> {
    return this.repo.find({ order: { created_at: 'DESC' } });
  }

  async create(dto: CreateCourtTypeDto): Promise<CourtType> {
    const [{ id }] = await this.repo.query(
      `SELECT court.generate_prefixed_id('COTP') AS id`,
    );

    const courtType = this.repo.create({
      id,
      name: dto.name,
    });

    return this.repo.save(courtType);
  }
}
