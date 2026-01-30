import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Court } from '../../entities/court.entity';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';

@Injectable()
export class CourtsService {
  constructor(
    @InjectRepository(Court)
    private readonly courtRepository: Repository<Court>,
  ) {}

  async create(createCourtDto: CreateCourtDto): Promise<Court> {
    const court = this.courtRepository.create(createCourtDto);
    return await this.courtRepository.save(court);
  }

  async findAll(): Promise<Court[]> {
    return await this.courtRepository.find({
      relations: ['courtSystem', 'courtLocationMaps', 'courtLocationMaps.location'],
    });
  }

  async findOne(id: string): Promise<Court> {
    const court = await this.courtRepository.findOne({
      where: { court_id: id },
      relations: ['courtSystem', 'courtLocationMaps', 'courtLocationMaps.location'],
    });

    if (!court) {
      throw new NotFoundException(`Court with ID ${id} not found`);
    }

    return court;
  }

  async findByStateKey(stateKey: string): Promise<any[]> {
    const result = await this.courtRepository
      .createQueryBuilder('c')
      .select('ct.name', 'court_type')
      .addSelect('cs.court_system_name', 'court_system')
      .addSelect('c.name', 'court')
      .addSelect('l.city', 'court_location')
      .addSelect('s.state_key', 'state')
      .innerJoin('c.courtSystem', 'cs')
      .innerJoin('cs.courtType', 'ct')
      .innerJoin('c.courtLocationMaps', 'clm')
      .innerJoin('clm.location', 'l')
      .innerJoin('l.state', 's')
      .where('s.state_key = :stateKey', { stateKey: stateKey.toUpperCase() })
      .orderBy('ct.name', 'ASC')
      .addOrderBy('cs.court_system_name', 'ASC')
      .addOrderBy('c.name', 'ASC')
      .addOrderBy('l.city', 'ASC')
      .getRawMany();

    return result;
  }

  async update(id: string, updateCourtDto: UpdateCourtDto): Promise<Court> {
    const court = await this.findOne(id);
    Object.assign(court, updateCourtDto);
    return await this.courtRepository.save(court);
  }

  async remove(id: string): Promise<void> {
    const court = await this.findOne(id);
    await this.courtRepository.remove(court);
  }
}
