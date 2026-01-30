import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourtLocationMap } from '../../entities/court-location-map.entity';
import { CreateCourtLocationMapDto } from './dto/create-court-location-map.dto';
import { UpdateCourtLocationMapDto } from './dto/update-court-location-map.dto';

@Injectable()
export class CourtLocationMapService {
  constructor(
    @InjectRepository(CourtLocationMap)
    private readonly courtLocationMapRepository: Repository<CourtLocationMap>,
  ) {}

  async create(
    createCourtLocationMapDto: CreateCourtLocationMapDto,
  ): Promise<CourtLocationMap> {
    const map = this.courtLocationMapRepository.create(createCourtLocationMapDto);
    return await this.courtLocationMapRepository.save(map);
  }

  async findAll(): Promise<CourtLocationMap[]> {
    return await this.courtLocationMapRepository.find({
      relations: ['court', 'location', 'location.state'],
    });
  }

  async findOne(id: number): Promise<CourtLocationMap> {
    const map = await this.courtLocationMapRepository.findOne({
      where: { id },
      relations: ['court', 'location', 'location.state'],
    });

    if (!map) {
      throw new NotFoundException(`Court location map with ID ${id} not found`);
    }

    return map;
  }

  async update(
    id: number,
    updateCourtLocationMapDto: UpdateCourtLocationMapDto,
  ): Promise<CourtLocationMap> {
    const map = await this.findOne(id);
    Object.assign(map, updateCourtLocationMapDto);
    return await this.courtLocationMapRepository.save(map);
  }

  async remove(id: number): Promise<void> {
    const map = await this.findOne(id);
    await this.courtLocationMapRepository.remove(map);
  }
}
