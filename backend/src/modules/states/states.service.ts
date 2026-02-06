import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from '../../entities/state.entity';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async findAllBasic(): Promise<Pick<State, 'id' | 'state_key' | 'display_name'>[]> {
    return await this.stateRepository.find({
      select: {
        id: true,
        state_key: true,
        display_name: true,
      },
      order: {
        display_name: 'ASC',
      },
    });
  }

  async create(createStateDto: CreateStateDto): Promise<State> {
    const state = this.stateRepository.create(createStateDto);
    return await this.stateRepository.save(state);
  }

  async findAll(): Promise<State[]> {
    return await this.stateRepository.find({
      relations: ['locations'],
    });
  }

  async findOne(id: number): Promise<State> {
    const state = await this.stateRepository.findOne({
      where: { id },
      relations: ['locations'],
    });

    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }

    return state;
  }

  async findByStateKey(stateKey: string): Promise<State> {
    const state = await this.stateRepository.findOne({
      where: { state_key: stateKey },
      relations: ['locations'],
    });

    if (!state) {
      throw new NotFoundException(`State with key ${stateKey} not found`);
    }

    return state;
  }

  async update(id: number, updateStateDto: UpdateStateDto): Promise<State> {
    const state = await this.findOne(id);
    Object.assign(state, updateStateDto);
    return await this.stateRepository.save(state);
  }

  async remove(id: number): Promise<void> {
    const state = await this.findOne(id);
    await this.stateRepository.remove(state);
  }
}
