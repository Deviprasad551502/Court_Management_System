import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoverageService } from './coverage.service';
import { CoverageController } from './coverage.controller';
import { CourtType } from '../../entities/court-type.entity';
import { State } from '../../entities/state.entity';
import { CourtSystem } from '../../entities/court-system.entity';
import { Court } from '../../entities/court.entity';
import { Location } from '../../entities/location.entity';
import { CourtLocationMap } from '../../entities/court-location-map.entity';
import { CourtTypesModule } from '../court-types/court-types.module';
import { StatesModule } from '../states/states.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourtType,
      State,
      CourtSystem,
      Court,
      Location,
      CourtLocationMap,
    ]),
    CourtTypesModule,
    StatesModule,
  ],
  controllers: [CoverageController],
  providers: [CoverageService],
})
export class CoverageModule {}
