import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtLocationMapService } from './court-location-map.service';
import { CourtLocationMapController } from './court-location-map.controller';
import { CourtLocationMap } from '../../entities/court-location-map.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourtLocationMap])],
  controllers: [CourtLocationMapController],
  providers: [CourtLocationMapService],
  exports: [CourtLocationMapService],
})
export class CourtLocationMapModule {}
