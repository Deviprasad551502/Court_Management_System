import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtTypesService } from './court-types.service';
import { CourtTypesController } from './court-types.controller';
import { CourtType } from '../../entities/court-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourtType])],
  controllers: [CourtTypesController],
  providers: [CourtTypesService],
  exports: [CourtTypesService],
})
export class CourtTypesModule {}
