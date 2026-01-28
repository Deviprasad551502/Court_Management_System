import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtTypesService } from './court-types.service';
import { CourtTypesController } from './court-types.controller';
import { CourtType } from './court-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourtType])],
  providers: [CourtTypesService],
  controllers: [CourtTypesController],
})
export class CourtTypesModule {}
