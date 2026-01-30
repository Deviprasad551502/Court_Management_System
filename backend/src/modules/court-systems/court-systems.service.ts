import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourtSystem } from 'src/entities/court-system.entity';
import { CreateCourtSystemDto } from './dto/create-court-system.dto';
import { UpdateCourtSystemDto } from './dto/update-court-system.dto';

@Injectable()
export class CourtSystemsService {
  constructor(
    @InjectRepository(CourtSystem)
    private readonly courtSystemRepository: Repository<CourtSystem>,
  ) {}

  async create(createCourtSystemDto: CreateCourtSystemDto): Promise<CourtSystem> {
    const courtSystem = this.courtSystemRepository.create(createCourtSystemDto);
    return await this.courtSystemRepository.save(courtSystem);
  }

  async findAll(): Promise<CourtSystem[]> {
    return await this.courtSystemRepository.find({
      relations: ['courtType', 'courts'],
    });
  }

  async findOne(id: string): Promise<CourtSystem> {
    const courtSystem = await this.courtSystemRepository.findOne({
      where: { court_system_id: id },
      relations: ['courtType', 'courts'],
    });

    if (!courtSystem) {
      throw new NotFoundException(`Court system with ID ${id} not found`);
    }

    return courtSystem;
  }

  async update(
    id: string,
    updateCourtSystemDto: UpdateCourtSystemDto,
  ): Promise<CourtSystem> {
    const courtSystem = await this.findOne(id);
    Object.assign(courtSystem, updateCourtSystemDto);
    return await this.courtSystemRepository.save(courtSystem);
  }

  async remove(id: string): Promise<void> {
    const courtSystem = await this.findOne(id);
    await this.courtSystemRepository.remove(courtSystem);
  }
}
