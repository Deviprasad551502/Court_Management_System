import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryFailedError } from 'typeorm';

import { CourtType } from '../../entities/court-type.entity';
import { CreateCourtTypeDto } from './dto/create-court-type.dto';
import { UpdateCourtTypeDto } from './dto/update-court-type.dto';


@Injectable()
export class CourtTypesService {
  constructor(
    @InjectRepository(CourtType)
    private readonly courtTypeRepository: Repository<CourtType>,
  ) {}

  // CREATE
  async create(
    createCourtTypeDto: CreateCourtTypeDto,
  ): Promise<CourtType> {
    const courtType = this.courtTypeRepository.create(createCourtTypeDto);
    return this.courtTypeRepository.save(courtType);
  }

  // READ ALL
  async findAll(): Promise<CourtType[]> {
    return this.courtTypeRepository.find();
  }

  // READ ONE
  async findOne(id: string): Promise<CourtType> {
    const courtType = await this.courtTypeRepository.findOne({
      where: { id },
    });

    if (!courtType) {
      throw new NotFoundException(`Court type with ID ${id} not found`);
    }

    return courtType;
  }

  // UPDATE
  async update(
    id: string,
    updateCourtTypeDto: UpdateCourtTypeDto,
  ): Promise<CourtType> {
    const courtType = await this.findOne(id);
    Object.assign(courtType, updateCourtTypeDto);
    return this.courtTypeRepository.save(courtType);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    const courtType = await this.findOne(id);

    try {
      await this.courtTypeRepository.remove(courtType);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        typeof (error as any).driverError?.code === 'string' &&
        (error as any).driverError.code === '23503'
      ) {
        throw new ConflictException(
          'Cannot delete this court type because it is referenced by one or more court systems. Delete the dependent court systems first.',
        );
      }
      throw error;
    }
  }
}
